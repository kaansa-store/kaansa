'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
  customerLogin,
  customerLogout,
  customerRegister,
  customerRecover,
  customerAddressCreate,
  customerAddressDelete,
  updateCartBuyerIdentity,
  getCustomerSummary,
} from '@/lib/shopify';
import {
  setCustomerToken,
  clearCustomerToken,
  getCustomerToken,
} from '@/lib/utils/session';
import { safeAccountRedirect } from '@/lib/utils/redirect';

const CART_COOKIE_NAME = 'kaansa_cart_id';

export type AuthActionState = { error?: string; success?: string } | null;

// Helper to sync cart with customer account on login
async function syncCartWithCustomer(accessToken: string) {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
    if (cartId) {
      await updateCartBuyerIdentity(cartId, accessToken);
    }
  } catch (error) {
    console.error('[Cart Sync Error]', error);
  }
}

// ─── Login ───────────────────────────────────────────────────────
export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const from = (formData.get('from') as string)?.trim();

  if (!email || !password) {
    return { error: 'Please fill in all fields.' };
  }

  try {
    const result = await customerLogin(email, password);

    if (result.customerUserErrors.length > 0) {
      const code = result.customerUserErrors[0].code;
      if (code === 'UNIDENTIFIED_CUSTOMER') {
        return { error: 'Email or password is incorrect.' };
      }
      return { error: result.customerUserErrors[0].message };
    }

    if (!result.customerAccessToken) {
      return { error: 'Something went wrong. Please try again.' };
    }

    await setCustomerToken(
      result.customerAccessToken.accessToken,
      result.customerAccessToken.expiresAt
    );

    // Sync cart with customer account
    await syncCartWithCustomer(result.customerAccessToken.accessToken);
  } catch (err: unknown) {
    console.error('[LoginAction Error]', err);
    return { error: 'Unable to connect to service. Please try again.' };
  }

  const destination = safeAccountRedirect(from);
  redirect(destination);
}

// ─── Register ────────────────────────────────────────────────────
export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const firstName = (formData.get('firstName') as string)?.trim();
  const lastName = (formData.get('lastName') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;

  if (!firstName || !lastName || !email || !password) {
    return { error: 'Please fill in all fields.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  try {
    const result = await customerRegister({
      firstName,
      lastName,
      email,
      password,
      acceptsMarketing: false,
    });

    if (result.customerUserErrors.length > 0) {
      const code = result.customerUserErrors[0].code;
      if (code === 'CUSTOMER_DISABLED') {
        return {
          error:
            'This email already exists from a previous order or subscriber list. Please reset your password to activate it, or use a new email.',
        };
      }
      if (code === 'TAKEN') {
        return { error: 'An account with this email already exists. Please sign in.' };
      }
      return { error: result.customerUserErrors[0].message };
    }

    // Auto-login after registration
    const loginResult = await customerLogin(email, password);
    if (loginResult.customerAccessToken) {
      await setCustomerToken(
        loginResult.customerAccessToken.accessToken,
        loginResult.customerAccessToken.expiresAt
      );

      // Sync cart with customer account
      await syncCartWithCustomer(loginResult.customerAccessToken.accessToken);
    }
  } catch (err: unknown) {
    console.error('[RegisterAction Error]', err);
    return { error: 'Unable to complete registration. Please try again.' };
  }

  redirect('/account');
}

// ─── Forgot password ─────────────────────────────────────────────
export async function forgotAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = (formData.get('email') as string)?.trim();
  if (!email) return { error: 'Please enter your email.' };

  try {
    const res = await customerRecover(email);
    if (res?.customerUserErrors && res.customerUserErrors.length > 0) {
      const code = res.customerUserErrors[0].code || 'USER_ERROR';
      console.warn('[ForgotAction Error Code]', code);
    }
  } catch {
    console.error('[ForgotAction Exception]');
  }

  // Always return generic success — do not reveal if email exists
  return {
    success:
      'If that email is registered in Shopify, a reset link is on its way. Check your inbox and spam folder.',
  };
}

// ─── Logout ──────────────────────────────────────────────────────
export async function logoutAction() {
  const token = await getCustomerToken();
  if (token) {
    try {
      await customerLogout(token);
    } catch (err) {
      console.warn('[Logout Error]', err);
    }
  }
  await clearCustomerToken();
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE_NAME);
  redirect('/');
}

// ─── Add address ─────────────────────────────────────────────────
export async function addAddressAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const token = await getCustomerToken();
  if (!token) redirect('/account/login');

  const address = {
    firstName: ((formData.get('firstName') as string) || '').trim(),
    lastName: ((formData.get('lastName') as string) || '').trim(),
    address1: ((formData.get('address1') as string) || '').trim(),
    address2: ((formData.get('address2') as string) || '').trim(),
    city: ((formData.get('city') as string) || '').trim(),
    province: ((formData.get('province') as string) || '').trim(),
    country: ((formData.get('country') as string) || 'India').trim(),
    zip: ((formData.get('zip') as string) || '').trim(),
    phone: ((formData.get('phone') as string) || '').trim(),
  };

  if (!address.address1 || !address.city || !address.zip) {
    return { error: 'Please fill in required address fields.' };
  }

  const result = await customerAddressCreate(token, address);
  if (result.customerUserErrors.length > 0) {
    return { error: result.customerUserErrors[0].message };
  }

  revalidatePath('/account/addresses');
  redirect('/account/addresses');
}

// ─── Delete address ──────────────────────────────────────────────
export async function deleteAddressAction(formData: FormData) {
  const token = await getCustomerToken();
  if (!token) redirect('/account/login');

  const id = formData.get('id') as string;
  if (id) {
    await customerAddressDelete(token, id);
    revalidatePath('/account/addresses');
  }
}

// ─── Session status helper ───────────────────────────────────────
export async function getCustomerSessionAction() {
  const token = await getCustomerToken();
  if (!token) return null;

  const customer = await getCustomerSummary(token);
  if (!customer) return null;

  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  };
}
