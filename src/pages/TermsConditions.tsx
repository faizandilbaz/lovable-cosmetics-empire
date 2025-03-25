
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

const TermsConditions = () => {
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
            <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                <strong>Last Updated:</strong> June 15, 2023
              </p>
              
              <p>
                Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website.
              </p>
              
              <p>
                By using [Store Name], you agree to our terms. These include responsible use of the website, respecting intellectual property, and adhering to purchase policies. Users must be 18+ or have parental guidance. We reserve the right to modify terms at any time.
              </p>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on our website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p>
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Product Information and Pricing</h2>
                <p>
                  We strive to provide accurate product information and pricing on our website. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered on our website is not as described, your sole remedy is to return it in unused condition.
                </p>
                <p>
                  Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product or service without notice at any time. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the product.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. User Accounts</h2>
                <p>
                  To access certain features of the website, you may be required to register for an account. You must provide accurate, current, and complete information during the registration process and keep your account information updated.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password. You should immediately notify us of any unauthorized use of your account or any other breach of security.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Order Acceptance and Fulfillment</h2>
                <p>
                  Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. We reserve the right at any time after receipt of your order to accept or decline your order for any reason.
                </p>
                <p>
                  We reserve the right to limit the quantities of any products or services that we offer. All orders are subject to verification, availability, and credit or debit card authorization. We may attempt to contact you if we have issues with your order.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Shipping and Delivery</h2>
                <p>
                  We will make every effort to ship your order according to the estimated delivery times provided at checkout. We cannot guarantee specific delivery times as shipping carriers are beyond our control and may be affected by various factors such as weather conditions and holidays.
                </p>
                <p>
                  You agree to inspect all products upon delivery and report any issues within 48 hours of receipt.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Returns and Refunds</h2>
                <p>
                  We want you to be completely satisfied with your purchase. If you are not satisfied, you may return most unused and unopened items within 30 days of delivery for a full refund of the purchase price, excluding shipping and handling fees.
                </p>
                <p>
                  Certain products, due to their nature, are not eligible for return. These include but are not limited to: products that have been opened, used, or damaged by the customer, personalized items, and sale items.
                </p>
                <p>
                  To initiate a return, please contact our customer service team for instructions and a return authorization.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Intellectual Property</h2>
                <p>
                  The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof), are owned by us, our licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. User Content</h2>
                <p>
                  By posting, uploading, submitting, or otherwise making available any content on our website, you grant us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, copy, modify, create derivative works based on, distribute, publicly display, publicly perform, and otherwise exploit such content in any way for any purpose.
                </p>
                <p>
                  You represent and warrant that you own or control all rights in and to the content you provide, and that such content does not violate these terms or any applicable law.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
                <p>
                  The materials on our website are provided on an 'as is' and 'as available' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p>
                  We do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">11. Limitation of Liability</h2>
                <p>
                  In no event shall we, our directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">12. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold us harmless from and against any claims, liabilities, damages, losses, and expenses, including without limitation, reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the website or your violation of these Terms and Conditions.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">13. Governing Law</h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the United States and the State of California, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any legal suit, action, or proceeding arising out of, or related to, these Terms and Conditions or the website shall be instituted exclusively in the federal courts of the United States or the courts of the State of California.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">14. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the website.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">15. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <ul>
                  <li>By email: terms@yourstore.com</li>
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

export default TermsConditions;
