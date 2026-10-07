import { redirect } from 'next/navigation';

export default function ReturnsRedirect() {
  redirect('/policies/refund-policy');
}
