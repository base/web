export function SubAccountIllustration({
  universalAccount,
  subAccount,
  universalAccountSigning,
  subAccountSigning,
}: {
  universalAccount: React.ReactNode;
  subAccount: React.ReactNode;
  universalAccountSigning: () => void;
  subAccountSigning: () => void;
}) {
  return (
    <div className="my-12 flex flex-col items-center">
      <div className="relative w-full max-w-3xl">
        {/* SVG Illustration with defs for gradients */}
        <svg viewBox="0 0 800 550" className="w-full">
          {/* Gradients and filters definitions */}
          <defs>
            {/* Universal Account Gradient - Brighter for dark mode */}
            <linearGradient id="universalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* Sub Account Gradient - Vibrant teal for dark mode */}
            <linearGradient id="subAccountGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>

            {/* Local Signing Gradient - Vibrant aqua for dark mode */}
            <linearGradient id="localSigningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            {/* Coinbase Wallet Gradient - Deep blue for dark mode */}
            <linearGradient id="coinbaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            {/* App with Signer Gradient - Rich purple for dark mode */}
            <linearGradient id="appSignerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B21A8" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>

            {/* Inner Shadow */}
            <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset in="blur" dx="0" dy="3" result="offsetBlur" />
              <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
            </filter>

            {/* Glow effect for dark mode */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Coinbase Wallet Container - Wider to accommodate text */}
          <rect
            x="70"
            y="80"
            width="260"
            height="200"
            rx="15"
            fill="url(#coinbaseGradient)"
            filter="url(#glow)"
          />
          <text
            x="200"
            y="115"
            fontSize="18"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            Coinbase Wallet
          </text>
          <text x="200" y="140" fontSize="13" fill="white" textAnchor="middle" opacity="0.9">
            keys.coinbase.com
          </text>

          {/* Universal Account - Inside Coinbase Wallet */}
          <rect
            x="100"
            y="155"
            width="200"
            height="90"
            rx="10"
            fill="url(#universalGradient)"
            filter="url(#innerShadow)"
            opacity="0.9"
          />
          <text
            x="200"
            y="185"
            fontSize="16"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            Universal Account
          </text>

          {/* Render ReactNode in a foreign object for universalAccount */}
          <foreignObject x="120" y="195" width="160" height="40">
            <div className="flex h-full w-full items-center justify-center text-xs text-white">
              {universalAccount}
            </div>
          </foreignObject>

          {/* Your App Container - Wider to accommodate text */}
          <rect
            x="470"
            y="80"
            width="260"
            height="200"
            rx="15"
            fill="url(#appSignerGradient)"
            filter="url(#glow)"
          />
          <text
            x="600"
            y="115"
            fontSize="18"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            Your App
          </text>
          <text x="600" y="140" fontSize="13" fill="white" textAnchor="middle" opacity="0.9">
            Contains Sub Account Signer
          </text>

          {/* Sub Account - Inside Your App */}
          <rect
            x="500"
            y="155"
            width="200"
            height="90"
            rx="10"
            fill="url(#subAccountGradient)"
            filter="url(#innerShadow)"
            opacity="0.9"
          />
          <text
            x="600"
            y="185"
            fontSize="16"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            Sub Account
          </text>

          {/* Render ReactNode in a foreign object for subAccount */}
          <foreignObject x="520" y="195" width="160" height="40">
            <div className="flex h-full w-full items-center justify-center text-xs text-white">
              {subAccount}
            </div>
          </foreignObject>

          {/* Local Signing Box - Wider with additional padding */}
          <rect
            x="500"
            y="350"
            width="200"
            height="90"
            rx="12"
            fill="url(#localSigningGradient)"
            filter="url(#glow)"
          />
          <text
            x="600"
            y="380"
            fontSize="16"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            Local Signing
          </text>
          <text x="600" y="405" fontSize="13" fill="white" textAnchor="middle" opacity="0.9">
            Sign with Sub Account
          </text>

          {/* Local Signing Button */}
          <foreignObject x="560" y="420" width="80" height="35">
            <div className="flex h-full w-full items-center justify-center">
              <button
                onClick={subAccountSigning}
                type="button"
                className="rounded-md bg-white/90 px-4 py-1.5 text-xs font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
              >
                Sign
              </button>
            </div>
          </foreignObject>

          {/* Universal Account Signing Box - Wider with additional padding */}
          <rect
            x="100"
            y="350"
            width="200"
            height="90"
            rx="12"
            fill="url(#universalGradient)"
            filter="url(#glow)"
          />
          <text
            x="200"
            y="380"
            fontSize="16"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            Universal Account Signing
          </text>
          <text x="200" y="405" fontSize="13" fill="white" textAnchor="middle" opacity="0.9">
            Sign with Universal Account
          </text>

          {/* Universal Signing Button */}
          <foreignObject x="160" y="420" width="80" height="35">
            <div className="flex h-full w-full items-center justify-center">
              <button
                type="button"
                onClick={universalAccountSigning}
                className="rounded-md bg-white/90 px-4 py-1.5 text-xs font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
              >
                Sign
              </button>
            </div>
          </foreignObject>

          {/* Universal to Sub Account relationship */}
          <path d="M300 200 L500 200" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          <polygon points="490,195 500,200 490,205" fill="rgba(255,255,255,0.7)" />

          {/* Universal Account to Universal Signing */}
          <path d="M200 245 L200 350" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          <polygon points="195,340 200,350 205,340" fill="rgba(255,255,255,0.7)" />

          {/* Connection Label */}
          <rect x="360" y="175" width="80" height="25" rx="12" fill="rgba(255,255,255,0.15)" />
          <text x="400" y="192" fontSize="13" fill="white" textAnchor="middle" fontWeight="500">
            Creates
          </text>

          {/* Sub Account to Local Transaction */}
          <path d="M600 245 L600 350" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
          <polygon points="595,340 600,350 605,340" fill="rgba(255,255,255,0.7)" />
        </svg>
      </div>

      <div className="mt-8 max-w-lg rounded-xl border border-slate-700/30 bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-6 text-center text-sm text-slate-300 shadow-sm">
        <h4 className="mb-3 text-base font-medium text-white">
          Your Universal Smart Wallet Ecosystem
        </h4>
        <p className="mb-3">
          Your universal Smart Wallet creates (or imports) and owns this app-specific Sub Account
          with the following capabilities:
        </p>
        <ul className="mt-4 list-none space-y-2 text-left">
          <li className="flex items-center">
            <span className="mr-2 inline-block h-4 w-4 rounded-full bg-sky-500 opacity-80" />
            <span>Manage its own assets and sign transactions independently</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 inline-block h-4 w-4 rounded-full bg-teal-400 opacity-80" />
            <span>Spend assets from universal account using user-approved Spend Permission</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 inline-block h-4 w-4 rounded-full bg-blue-400 opacity-80" />
            <span>Be controlled by both your universal wallet and authorized app logic</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
