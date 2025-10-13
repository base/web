'use client';
import { useState, useCallback } from 'react';
import { Icon } from 'base-ui';
import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import classNames from 'classnames';

function FaqItem({ question, answer }: { question: string; answer: JSX.Element | string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <div className="border-b border-[#5B616E]/20">
      <button
        className="text-gray-800 flex w-full items-center justify-between py-4 text-left font-medium focus:outline-none"
        onClick={toggleOpen}
        type="button"
      >
        <span>{question}</span>
        <Icon name="caret" width="24" height="24" color="black" />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="text-gray-600 pb-4">{answer}</div>
      </div>
    </div>
  );
}

export default function RegistrationFAQ() {
  const { registrationStep } = useRegistration();

  const isSearch = registrationStep === RegistrationSteps.Search;
  return (
    <section
      className={classNames('mx-auto max-w-6xl px-4 pb-36 md:pt-20', {
        hidden: !isSearch,
        'display: block': isSearch,
      })}
    >
      <div className="flex flex-col items-center lg:flex-row">
        <div className="mb-8 w-full text-left lg:mb-0 lg:w-1/2">
          <h2 className="mb-8 text-5xl font-normal md:text-6xl">
            Questions? <br /> See our FAQ
          </h2>
          <p className="max-w-md text-xl">
            Get more answers in our FAQ, and view our developer docs to see how you can build with
            Basenames.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <FaqItem
            question="What are Basenames?"
            answer={
              <p>
                Basenames are a core onchain building block that enable builders to establish their
                identity on Base by registering human-readable names for their wallet address(es).
                They are fully onchain, built on the same technology powering ENS names, and
                deployed on Base. These human-readable names can be used when connecting to onchain
                apps, and sending and receiving on Base and any other EVM chain.
              </p>
            }
          />
          <FaqItem
            question="What are the Basename registration fees?"
            answer={
              <div>
                <p className="mb-6 leading-relaxed">
                  Basenames are priced based on name length, and are designed to be globally
                  accessible. Annual registration fees are as follows:
                </p>
                <div className="flex justify-center">
                  <table className="border-gray-300 border-collapse border">
                    <thead>
                      <tr>
                        <th className="border-gray-300 border px-4 py-2">Length</th>
                        <th className="border-gray-300 border px-4 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-gray-300 border px-4 py-2">3 characters</td>
                        <td className="border-gray-300 border px-4 py-2">0.1 ETH</td>
                      </tr>
                      <tr>
                        <td className="border-gray-300 border px-4 py-2">4 characters</td>
                        <td className="border-gray-300 border px-4 py-2">0.01 ETH</td>
                      </tr>
                      <tr>
                        <td className="border-gray-300 border px-4 py-2">5-9 characters</td>
                        <td className="border-gray-300 border px-4 py-2">0.001 ETH</td>
                      </tr>
                      <tr>
                        <td className="border-gray-300 border px-4 py-2">10+ characters</td>
                        <td className="border-gray-300 border px-4 py-2">0.0001 ETH</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />
          <FaqItem
            question="How do I get a free or discounted Basename?"
            answer={
              <div className="text-gray-800 mx-auto max-w-3xl p-6 font-sans">
                <p className="mb-4">
                  You can get one free Basename (5+ letters) for one year if you meet any of the
                  below criteria:
                </p>

                <ul className="mb-4 list-disc space-y-2 pl-6">
                  <li>
                    <a
                      href="http://coinbase.com/onchain-verify"
                      className="text-blue-600 hover:underline"
                    >
                      Coinbase Verification
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://coinbase.com/onchain-verify"
                      className="text-blue-600 hover:underline"
                    >
                      Coinbase One Verification
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wallet.coinbase.com/ocs"
                      className="text-blue-600 hover:underline"
                    >
                      Summer Pass Level 3 NFT
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://onchain-summer.devfolio.co/"
                      className="text-blue-600 hover:underline"
                    >
                      Buildathon participant NFT
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://opensea.io/collection/base-org-base-eth"
                      className="text-blue-600 hover:underline"
                    >
                      base.eth NFT holder
                    </a>
                  </li>
                  <li>cb.id username (acquired prior to Fri Aug 9, 2024)</li>
                  <li>
                    <a href="http://basename.app" className="text-blue-600 hover:underline">
                      BNS name owner - free 4+ letter name (basename.app)
                    </a>
                  </li>
                </ul>

                <p className="mb-4">
                  An equivalent-value discount of 0.001 ETH will be applied if registering a shorter
                  name, or registering for more than 1 year, with the exception of the BNS name
                  owner discount (valued at 0.01 ETH per unique address). You will need to pay the
                  standard registration fees if you wish to keep your Basename after your initial
                  discount has been fully applied.
                </p>

                <p className="mb-4">
                  Discounts are only applied once, and are limited to one per address. Even if you
                  meet multiple criteria, you will only be eligible for a single discount on one
                  Basename. If you satisfy multiple criteria, we will automatically apply the
                  highest-value discount to your registration.
                </p>

                <p className="mb-4">
                  We are always looking to add more discounts. If you or your project have ideas for
                  more discounts, please reach out to our team.
                </p>
              </div>
            }
          />
          <FaqItem
            question="How can I use Basenames?"
            answer={
              <p>
                You can use your Basename across apps in the Base ecosystem, starting with base.org,
                Onchain Registry, and Onchain Summer Pass. You can also use it for sending and
                receiving on Base and other EVM chains.
              </p>
            }
          />
          <FaqItem
            question="Is my profile information published onchain?"
            answer={
              <p>
                Basenames are fully onchain, and therefore any information you publish is recorded
                onchain, requires a transaction, and will be broadly composable with the rest of the
                ecosystem. Please do not publish any information you do not wish to be onchain.
              </p>
            }
          />
          <FaqItem
            question="I am a builder. How do I integrate Basenames to my app?"
            answer={
              <p>
                If you&apos;re a builder looking to integrate Basenames into your app,{' '}
                <a
                  href="https://github.com/coinbase/onchainkit"
                  className="text-blue-600 hover:underline"
                >
                  OnchainKit
                </a>{' '}
                is the easiest way to get started (
                <a
                  href="https://docs.base.org/identity/basenames/basenames-onchainkit-tutorial"
                  className="text-blue-600 hover:underline"
                >
                  tutorial here
                </a>
                ). If you have ideas for new features or badges that you&apos;d like to integrate
                with Basenames, we&apos;d love to hear from you.
              </p>
            }
          />
          <FaqItem
            question="How do I get a Basename for my app or project?"
            answer={
              <div>
                <p className="mb-4">
                  You can register a Basename for your app just like any other Basename. If a
                  Basename for your app or project is not available, there is a good chance it was
                  reserved.
                </p>
                <p className="mb-4">
                  Please reach out to our team or fill out{' '}
                  <a
                    href="https://app.deform.cc/form/20372eb6-ec97-4d37-967f-d36f4b7f4eb2"
                    className="text-blue-600 hover:underline"
                  >
                    this form
                  </a>{' '}
                  and we will reach out with instructions.
                </p>
                <p>
                  Visit{' '}
                  <a
                    href="https://docs.base.org/docs/tools/basenames-faq"
                    className="text-blue-600 hover:underline"
                  >
                    FAQs
                  </a>{' '}
                  to learn more.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
