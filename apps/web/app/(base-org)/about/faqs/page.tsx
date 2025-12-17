'use client';

import { useState, useCallback, ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type FAQItem = {
  question: string;
  answer: ReactNode;
};

type FAQSection = {
  title: string;
  items: FAQItem[];
};

function FAQAccordion({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <div className="border-gray-200 border-b">
      <button
        type="button"
        className="flex w-full flex-row items-center justify-between py-5 text-left"
        onClick={toggleOpen}
      >
        <span className="text-gray-900 pr-4 text-base font-medium">{question}</span>
        <span className="flex-shrink-0">
          {isOpen ? (
            <ChevronUpIcon className="text-gray-500 h-5 w-5" />
          ) : (
            <ChevronDownIcon className="text-gray-500 h-5 w-5" />
          )}
        </span>
      </button>
      {isOpen && <div className="text-gray-600 pb-5 text-base">{answer}</div>}
    </div>
  );
}

const FAQ_SECTIONS: FAQSection[] = [
  {
    title: 'Onboarding',
    items: [
      {
        question: 'How do I create a new account?',
        answer:
          'To create a new account, select "Create Account" during the onboarding process. Enter a unique basename and follow the prompts to complete your setup.',
      },
      {
        question: 'How do I sign in or create an account using a social account?',
        answer: (
          <div className="space-y-3">
            <p>
              You cannot sign in using a social account at this time. You can sign in or create an
              account using one of the following two options:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Using a Passkey from a Smart Wallet:</strong> If you've set up a smart
                wallet, you can use a passkey for secure sign-in. This method ensures that you can
                access your account while maintaining a high level of security.
              </li>
              <li>
                <strong>Email OTP:</strong> You can sign in or create an account using your email.
              </li>
            </ul>
            <p>
              To learn more about how to create an account, please visit our{' '}
              <a
                href="https://help.coinbase.com/en/base"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 text-blue-600 underline"
              >
                help article
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        question: 'How do I import an existing basename?',
        answer: (
          <p>
            If you want to import an existing basename, simply enter the Base App with a wallet that
            holds the basename you wish to import. Alternatively, you can follow the transfer
            instructions in our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Base support documentation
            </a>
            .
          </p>
        ),
      },
      {
        question: "What if I don't see my profile after creating an account?",
        answer:
          'Ensure that you completed all onboarding steps fully. Check your internet connection and retry the process. If issues persist, take note of your basename and userID (settings) and escalate to Coinbase support or in our community Discord if you do not have a Coinbase account.',
      },
      {
        question: 'What is the email OTP sign-in process?',
        answer: (
          <p>
            During sign-in, a One-Time Password (OTP) will be sent to your registered email. Please
            enter the OTP in the app to access your account securely. For more details about Base
            app sign in options, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
      {
        question: "What should I do if I don't receive the OTP?",
        answer: (
          <p>
            If you don't receive the OTP, please verify that your email address is correct, check
            your spam folder, and ensure your internet connection is stable. If you still haven't
            received it, try resending the OTP. For more details about Base app sign in options,
            please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
      {
        question: 'What happens if I enter an incorrect OTP several times?',
        answer: (
          <p>
            If you enter an incorrect OTP multiple times, your account will be temporarily locked.
            Please wait a few minutes before attempting to sign in again, or use the password reset
            option if needed. For more details about Base app sign in options, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    title: 'Switching Between Legacy Coinbase Wallet and Base Mode',
    items: [
      {
        question: 'How do I switch between Legacy Mode and Base Mode?',
        answer: (
          <p>
            To switch between modes, select your profile picture within the app. There, you will
            find the option to toggle between Base Mode and Legacy Mode. For more details about how
            to get started on Base, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
      {
        question: 'What is the difference between Base Mode and Legacy Mode?',
        answer: (
          <p>
            Base Mode is the new social experience, while Legacy Mode retains the original Coinbase
            Wallet experience. This allows access to different features and functionalities. To
            learn more about Base app and its features, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
      {
        question: 'Can I import my existing wallet into Base Mode?',
        answer: (
          <div className="space-y-3">
            <p>
              Currently, you cannot import your Externally Owned Account (EOA) wallet into the Base
              app. However, we are working on adding this functionality in the future.
            </p>
            <p>
              For now, if you want to use the Base app, you need to create a new Base account or
              upgrade your existing wallet. The upgrade allows you to access more features without
              needing to transfer your funds to a different wallet.
            </p>
            <p>
              Stay tuned for updates on EOA wallet imports, as we're excited to enhance your
              experience soon! To learn how to upgrade your wallet for Base mode, please visit our{' '}
              <a
                href="https://help.coinbase.com/en/base"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 text-blue-600 underline"
              >
                help center
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        question: 'Can I import my EOA wallet to the Base app?',
        answer: (
          <p>
            Currently, importing an EOA wallet is not available to access Base mode directly.
            However, you can import your EOA wallet to access the legacy wallet experience where
            you'll be prompted to upgrade your wallet to access Base mode. To learn how to upgrade
            your wallet for Base mode and other sign in options, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    title: 'Passkey Import and Management',
    items: [
      {
        question: 'Can I import multiple passkeys into the Base app?',
        answer:
          'Currently, the Base app supports the importation of one passkey at a time. If you have multiple passkeys, you will need to select the passkey you wish to import into the Base app.',
      },
      {
        question: 'How do I import my passkey into the Base app?',
        answer: (
          <div className="space-y-3">
            <p>To import your passkey into the Base app, follow these steps:</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Launch the Base app and navigate to the sign-in page.</li>
              <li>Select the option to sign in using your passkey.</li>
              <li>
                Follow the prompts to enter your passkey details and complete the authentication
                process.
              </li>
            </ol>
            <p>
              To learn more about how to import your passkey, please visit this{' '}
              <a
                href="https://help.coinbase.com/en/base"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 text-blue-600 underline"
              >
                help article
              </a>
              .
            </p>
          </div>
        ),
      },
      {
        question: 'Will I be able to use all my passkeys once imported into the Base app?',
        answer:
          "Once you import a passkey into the Base app, it will be used exclusively for your authentication. Please note that you won't have the ability to switch between different imported wallets, even if you've previously signed in with them in the Base app.",
      },
      {
        question: 'Is there a way to manage my passkeys in the Base app?',
        answer: (
          <p>
            You can manage your passkeys on your device. To learn more about managing your smart
            wallet passkeys, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help article
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    title: 'USDC Rewards',
    items: [
      {
        question: 'How do I enroll in USDC rewards?',
        answer:
          'To enroll in USDC rewards, make sure you have USDC funds available in your wallet. Then, navigate to the USDC rewards section in the Wallet tab and follow the prompts to complete your enrollment.',
      },
      {
        question: 'What are the eligibility requirements for USDC rewards?',
        answer: (
          <p>
            USDC rewards enrollment is primarily available to U.S. residents. Users outside the U.S.
            can participate without needing to connect to a Coinbase account. To learn more, please
            visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
      {
        question: 'What benefits do I get from USDC rewards?',
        answer: (
          <p>
            Holding USDC allows you to earn APY with no minimums or maximums on your holdings. You
            must hold a minimum of $1 to receive rewards. To learn more about USDC rewards on Base
            please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help center
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    title: 'Chat Functionality',
    items: [
      {
        question: 'How do I activate chat functionality?',
        answer: (
          <p>
            Chat will be activated during onboarding. You may need to activate manually by clicking
            the chat icon on the upper right hand corner of the screen. For more details about chat
            on Base, please visit this{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help article
            </a>
            .
          </p>
        ),
      },
      {
        question:
          "Why is the chat icon on my friend's profile greyed out? Can I still message them?",
        answer: (
          <div className="space-y-3">
            <p>
              If the chat icon on another user's profile is greyed out, it means they have not
              activated the chat functionality, and therefore, they are unable to receive any
              messages. For them to chat, they will need to activate their address during the
              onboarding process within the Base app.
            </p>
            <p>
              Additionally, if a user appears on the Base app's social feed from another app but has
              not actually signed up for Base, they won't be able to activate chat functionality at
              all. Encourage your friend to activate their account so that you can start chatting.
              If they need assistance, they can refer to the support articles for guidance. If they
              are still running into issues, please have them contact us for support.
            </p>
          </div>
        ),
      },
      {
        question: 'What if I encounter a spam warning in chat?',
        answer:
          "Messages perceived as spam may be filtered into the hidden tab. Check this filter if you're expecting a message and don't see it in your inbox.",
      },
      {
        question: 'What should I do if I suspect an impersonator?',
        answer:
          'Report any suspicious accounts immediately through the app. Verify identities to protect yourself from potential scams.',
      },
    ],
  },
  {
    title: 'Trading',
    items: [
      {
        question: 'How do I initiate a trade/transfer/transaction?',
        answer: (
          <p>
            For detailed instructions on how to transact within the Base app, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help article
            </a>
            .
          </p>
        ),
      },
      {
        question: 'What is slippage tolerance, and how do I set it?',
        answer:
          'Slippage tolerance sets the maximum acceptable deviation from the expected trade price. You can adjust this setting directly in the trading interface before confirming your transaction.',
      },
      {
        question: 'Can I see my previous trades?',
        answer:
          'Yes, you can access your trading history in the Activity section of the Wallet tab, which compiles all your past trades for easy reference.',
      },
    ],
  },
  {
    title: 'Transaction and Balance Questions',
    items: [
      {
        question: 'What chains are supported for transactions within the Base App?',
        answer: (
          <div className="space-y-3">
            <p>
              The Base App supports transactions across various blockchain networks, including all
              assets on Ethereum, Base, Polygon, and other EVM-compatible networks. For more details
              please visit our{' '}
              <a
                href="https://help.coinbase.com/en/base"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 text-blue-600 underline"
              >
                help center
              </a>
              .
            </p>
            <p>
              However, it's important to note that not all assets supported in the Base App are
              available on Coinbase. To check if a specific asset is supported on Coinbase, simply
              follow these steps:
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Tap the "Deposit" button and select "Receive Crypto."</li>
              <li>Search for the asset you are interested in.</li>
            </ol>
            <p>
              This will help you verify asset compatibility and ensure a smooth transaction
              experience.
            </p>
          </div>
        ),
      },
      {
        question: 'How do I send and receive digital assets on Base app?',
        answer: (
          <p>
            For detailed instructions on sending and receiving crypto assets in the Base app, please
            visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              help article
            </a>
            .
          </p>
        ),
      },
      {
        question: 'How long do transactions take to process in the app?',
        answer:
          'Transaction processing times can vary depending on network congestion and the specific asset being used. Generally, transactions can take anywhere from a few seconds to several minutes to complete.',
      },
      {
        question: 'I see no funds in my wallet after switching to Base Mode, what should I do?',
        answer: (
          <p>
            To access your previous wallet, please switch off Base Mode. Once you do this, you will
            be able to view the funds from your original wallet. If you wish to use your wallet
            funds while in Base Mode, you will need to transfer them. For more information, please
            visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Help Center
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    title: 'Account Access',
    items: [
      {
        question: 'What should I do if I cannot log into my account?',
        answer: (
          <p>
            Please check your email for the OTP if you're using email sign-in. If you're still
            experiencing issues, make sure your app is up to date, and don't hesitate to reach out
            to{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Coinbase customer support
            </a>{' '}
            for further assistance or reach out in our{' '}
            <a
              href="https://discord.com/invite/buildonbase"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              community Discord
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    title: 'Troubleshooting and Support',
    items: [
      {
        question: 'What should I do if a transaction fails?',
        answer: (
          <div className="space-y-3">
            <p>To ensure a successful transaction, please check the following:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Confirm that your internet connection is stable.</li>
              <li>Make sure you have sufficient funds in your wallet.</li>
              <li>Verify that the recipient's address is correct.</li>
            </ul>
            <p>
              After checking these points, please try the transaction again. If you continue to
              experience issues, feel free to reach out for further assistance.
            </p>
          </div>
        ),
      },
      {
        question: 'How can I contact support for more help?',
        answer: (
          <p>
            For assistance, please visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Help Center
            </a>
            , where you can find articles related to the Base app and its features. If you need
            further support, feel free to submit a request using the contact options available. We
            also encourage you to join our community on the{' '}
            <a
              href="https://discord.com/invite/buildonbase"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Base Discord
            </a>
            , where you can ask your questions and connect with fellow users.
          </p>
        ),
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 text-4xl font-bold tracking-tight sm:text-5xl">
            Base App FAQs
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Find answers to commonly asked questions about the Base app and its features.
          </p>
        </div>

        <div className="space-y-12">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-gray-900 mb-6 text-2xl font-semibold">{section.title}</h2>
              <div className="border-gray-200 rounded-lg border bg-white">
                {section.items.map((item) => (
                  <FAQAccordion key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-gray-50 p-8 text-center">
          <h3 className="text-gray-900 text-xl font-semibold">Still have questions?</h3>
          <p className="text-gray-600 mt-2">
            Visit our{' '}
            <a
              href="https://help.coinbase.com/en/base"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Help Center
            </a>{' '}
            for more detailed support or join our{' '}
            <a
              href="https://discord.com/invite/buildonbase"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Discord community
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
