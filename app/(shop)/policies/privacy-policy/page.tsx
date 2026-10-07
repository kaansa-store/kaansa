import type { Metadata } from 'next';
import PolicyLayout from '@/components/policies/PolicyLayout';
import { siteContact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how KAANSA collects, uses, protects, and manages your personal information while shopping on our website.',
  alternates: {
    canonical: '/policies/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle={`At KAANSA, accessible from https://kaansalife.com, one of our main priorities is the privacy of our visitors.`}
      lastUpdated="6 October 2026"
    >
      <div className="space-y-6 text-[var(--color-text)]">
        {/* Intro */}
        <section className="space-y-4">
          <p>
            At <strong>KAANSA</strong>, accessible from <a href="https://kaansalife.com">https://kaansalife.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by KAANSA and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at{' '}
            <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>.
          </p>
        </section>

        {/* Log Files */}
        <section className="space-y-3">
          <h2>Log Files</h2>
          <p>
            KAANSA follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as a part of hosting services&rsquo; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&rsquo; movement on the website, and gathering demographic information.
          </p>
        </section>

        {/* Cookies and Web Beacons */}
        <section className="space-y-3">
          <h2>Cookies and Web Beacons</h2>
          <p>
            Like any other website, KAANSA uses &lsquo;cookies&rsquo;. These cookies are used to store information including visitors&rsquo; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&rsquo; experience by customizing our web page content based on visitors&rsquo; browser type and/or other information.
          </p>
        </section>

        {/* Privacy Policies */}
        <section className="space-y-3">
          <h2>Privacy Policies</h2>
          <p>
            You may consult this list to find the Privacy Policy for each of the advertising and technology partners of KAANSA.
          </p>
          <p>
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on KAANSA, which are sent directly to users&rsquo; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that KAANSA has no access to or control over these cookies that are used by third-party advertisers.
          </p>
        </section>

        {/* Third Party Privacy Policies */}
        <section className="space-y-3">
          <h2>Third Party Privacy Policies</h2>
          <p>
            KAANSA&rsquo;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&rsquo; respective websites.
          </p>
        </section>

        {/* International and Cross-Border Transfers */}
        <section className="space-y-3">
          <h2>International and Cross-Border Transfers of Personal Information</h2>
          <p>
            KAANSA is based in India. In operating our website, processing orders, communicating with customers, analysing website usage, preventing fraud and carrying out marketing and advertising activities, we may engage third-party technology and service providers whose systems, personnel, servers or infrastructure may be located in India or in other countries.
          </p>
          <p>
            As a result, your personal information may, where necessary, be transferred to, accessed from, processed or stored in countries outside India.
          </p>
          <p>
            Such service providers may include, depending on the services used by us from time to time, providers of ecommerce infrastructure and hosting, cloud storage, payment processing, logistics, customer support, communications, analytics, advertising, fraud prevention and other technology services.
          </p>
          <p>
            Where personal information is transferred outside India, we will take reasonable steps to ensure that such transfer is carried out in accordance with applicable Indian law and that appropriate contractual, technical and organisational safeguards are maintained to protect the information.
          </p>
          <p>
            Where a transfer involves sensitive personal data or information under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and the Digital Personal Data Protection Act, 2023, such transfer will be made only in accordance with statutory requirements.
          </p>
        </section>

        {/* Children's Information */}
        <section className="space-y-3">
          <h2>Children&rsquo;s Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            KAANSA does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>

        {/* Data Retention and Deletion */}
        <section className="space-y-3">
          <h2>Data Retention and Deletion</h2>
          <p>
            We retain your personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, to provide our products and services, to comply with applicable legal, tax, accounting and regulatory requirements, to resolve disputes, prevent fraud, enforce our agreements, and protect our legitimate interests.
          </p>
          <p>
            Depending on the nature of the information, our general retention practices are as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Order, transaction, invoice and billing records:</strong> generally retained for up to 8 years, or for such longer period as may be required under applicable tax, accounting or other laws.
            </li>
            <li>
              <strong>Customer account and profile information:</strong> retained while your account remains active and thereafter only for such period as is reasonably necessary for customer service, warranty, legal, fraud-prevention or record-keeping purposes.
            </li>
            <li>
              <strong>Delivery and contact information:</strong> retained for as long as required to fulfil your order and provide post-purchase support, and thereafter in accordance with our legal and record-keeping requirements.
            </li>
            <li>
              <strong>Customer service and correspondence records:</strong> generally retained for up to 3 years from the last interaction, unless a longer period is required in connection with an ongoing dispute, warranty claim or legal requirement.
            </li>
            <li>
              <strong>Marketing information:</strong> retained until you withdraw your consent, unsubscribe or otherwise opt out. We may retain limited information thereafter to ensure that your opt-out preference continues to be respected.
            </li>
            <li>
              <strong>Website, device, analytics and cookie-related information:</strong> retained in accordance with the retention settings applicable to the relevant systems and service providers and only for as long as reasonably necessary for analytics, security, fraud prevention and website functionality.
            </li>
            <li>
              <strong>Payment information:</strong> payments are processed by authorised third-party payment service providers. KAANSA does not intend to store complete card numbers, CVV details or other authentication credentials where these are processed directly by such payment providers. We may retain transaction references, payment status, invoices and related records for accounting, reconciliation, fraud prevention and legal compliance.
            </li>
          </ul>
          <p>
            When personal information is no longer required for the purposes for which it was collected, and its continued retention is not required or permitted by applicable law, we will take reasonable steps to delete, anonymise or otherwise securely dispose of such information.
          </p>
          <p>
            Where you validly request deletion or withdraw consent for processing that is based on consent, we will take reasonable steps to cease the relevant processing and delete the applicable personal information, including by instructing our service providers where appropriate, unless continued retention or processing is required or permitted under applicable law.
          </p>
        </section>

        {/* Online Privacy Policy Only */}
        <section className="space-y-3">
          <h2>Online Privacy Policy Only</h2>
          <p>
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in KAANSA. This policy is not applicable to any information collected offline or via channels other than this website.
          </p>
        </section>

        {/* Consent */}
        <section className="space-y-3">
          <h2>Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
