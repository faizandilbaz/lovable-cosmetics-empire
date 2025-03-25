
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

const PrivacyPolicy = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <Container className="py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                <strong>Last Updated:</strong> June 15, 2023
              </p>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Introduction</h2>
                <p>
                  We collect personal information to fulfill orders and offer better service. This includes your name, email, address, and payment data. Your data is not sold or shared except to fulfill your order or comply with legal requests. You can request data export or deletion anytime.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
                <p>
                  We collect various types of information from and about users of our website, including:
                </p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, email address, postal address, phone number, and payment information.
                  </li>
                  <li>
                    <strong>Account Information:</strong> Your login credentials, purchase history, and saved preferences.
                  </li>
                  <li>
                    <strong>Order Information:</strong> Details about products purchased, shipping address, billing address, and payment methods.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> IP address, browser type, operating system, and device information.
                  </li>
                  <li>
                    <strong>Usage Information:</strong> Pages viewed, time spent on the website, links clicked, and shopping preferences.
                  </li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including:</p>
                <ul>
                  <li>Processing and fulfilling your orders</li>
                  <li>Managing your account and providing customer support</li>
                  <li>Personalizing your shopping experience</li>
                  <li>Sending order confirmations and shipping updates</li>
                  <li>Communicating about promotions, products, and services (with your consent)</li>
                  <li>Improving our website, products, and services</li>
                  <li>Detecting and preventing fraud and unauthorized access</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Sharing Your Information</h2>
                <p>
                  We may share your personal information with the following parties:
                </p>
                <ul>
                  <li>
                    <strong>Service Providers:</strong> Companies that perform services on our behalf, such as payment processing, shipping, and customer service.
                  </li>
                  <li>
                    <strong>Business Partners:</strong> Trusted third parties who help us operate our business, such as marketing agencies and analytics providers.
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> When required by law, court order, or governmental regulation.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets.
                  </li>
                </ul>
                <p>
                  We do not sell your personal information to third parties for their marketing purposes.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul>
                  <li>Accessing, correcting, or deleting your personal information</li>
                  <li>Withdrawing your consent to process your data</li>
                  <li>Requesting a copy of your personal information</li>
                  <li>Opting out of marketing communications</li>
                  <li>Restricting or objecting to certain processing activities</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration. However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and to hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
                <p>
                  For more information about our use of cookies, please see our Cookies Policy.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
                <p>
                  Our website is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul>
                  <li>By email: privacy@yourstore.com</li>
                  <li>By phone: +1 (555) 123-4567</li>
                  <li>By mail: 123 Beauty Lane, Cosmetic City, CA 90210, United States</li>
                </ul>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
