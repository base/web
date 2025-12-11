// .eslintrc.js
module.exports = {
	// Indicates that this is the root configuration file for the ESLint process.
	root: true,
	// Reports unused ESLint disable directives (e.g., // eslint-disable-line rule-name).
	reportUnusedDisableDirectives: true,

	// Configuration for TypeScript parsing
	parserOptions: {
		// Note: The project setting is typically used to specify tsconfig.json files
		// for type-aware linting. Assuming it's inherited from the 'extends' config.
		// EXPERIMENTAL_useProjectService: true, // Legacy/experimental setting, often removed for stability.
	},

	// Plugins provide rules, environments, and processors.
	plugins: ['react-perf', 'relay', '@typescript-eslint', 'import'],

	// Base configurations
	extends: [
		// Airbnb standard rules for TypeScript and non-React environments.
		'airbnb-typescript/base',
		// Airbnb React rules.
		'airbnb/rules/react',
		// Airbnb accessibility rules.
		'airbnb/rules/react-a11y',
		// Relay specific rules with strict checking.
		'plugin:relay/strict',
	],

	// === FILE-SPECIFIC OVERRIDES (e.g., Documentation/Storybook) ===
	overrides: [
		{
			// Target documentation and development/showcase environments (Docusaurus, Storybook).
			files: [
				'apps/*-docs/**/*',
				'apps/*-storybook/**/*',
				'examples/docusaurus/**/*',
				'examples/storybook/**/*',
			],
			rules: {
				// Third-party tools often require non-dev dependencies or specific import extensions.
				'import/no-extraneous-dependencies': 'off',
				'import/extensions': 'off',
			},
		},
	],

	// === CUSTOM RULE CONFIGURATION ===
	rules: {
		// --- Imports ---
		// Enforce no file extensions on imports (standard in modern JS/TS).
		'import/extensions': ['error', 'never'],

		// --- React: General ---
		// Allow prop spreading (utilize spread operator for props).
		'react/jsx-props-no-spreading': 'off',
		// Allow use of class properties for state initialization (state in constructor is verbose).
		'react/state-in-constructor': 'off',
		// Allow not destructuring props/state (often leads to cleaner code when used judiciously).
		'react/destructuring-assignment': 'off',
		// Allow JSX in files with extensions other than .js/.jsx.
		'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.mdx'] }],
		// React 17+ supports JSX transformation, so importing React is not necessary.
		'react/react-in-jsx-scope': 'off',
		// Disable rule about single expression per line, allowing for compact ternary operators.
		'react/jsx-one-expression-per-line': 'off',
		// Enforce preferred function component definition style for consistency.
		'react/function-component-definition': [
			'error',
			{ namedComponents: 'function-declaration', unnamedComponents: 'function-expression' },
		],
		// Enforce 'on' or 'handle' prefix for event handlers.
		'react/jsx-handler-names': 'error',

		// --- React: TypeScript (Prop-Types Disable) ---
		// Since TypeScript is used, all prop-types related rules are disabled.
		'react/default-props-match-prop-types': 'off',
		'react/forbid-foreign-prop-types': 'off',
		'react/forbid-prop-types': 'off',
		'react/no-unused-prop-types': 'off',
		'react/prefer-read-only-props': 'off',
		'react/prop-types': 'off',
		'react/require-default-props': 'off',
		'react/sort-prop-types': 'off',

		// --- React Performance (react-perf plugin) ---
		// Avoid passing new arrays, functions, or objects as props to prevent unnecessary re-renders.
		'react-perf/jsx-no-new-array-as-prop': 'warn',
		'react-perf/jsx-no-new-function-as-prop': 'warn',
		'react-perf/jsx-no-new-object-as-prop': ['warn', { nativeAllowList: ['style'] }],

		// --- Code Style/Readability ---
		// Require named functions for inferring component displayName (crucial for memo/forwardRef).
		'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

		// --- Relay/GraphQL ---
		// Disable flow type checks as TypeScript is used.
		'relay/generated-flow-types': 'off',

		// === TypeScript Rules (@typescript-eslint) ===

		// --- Shorthand Types & Naming ---
		'@typescript-eslint/array-type': ['error', { default: 'array' }], // Use T[] instead of Array<T>.
		'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'], // Prefer Record<K, V>.
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'], // Prefer type aliases over interfaces.
		'@typescript-eslint/method-signature-style': ['error', 'property'], // Prefer property signatures in types/interfaces.
		'@typescript-eslint/no-inferrable-types': 'error', // Prevent redundant type annotations on variables.

		// --- Type Safety & Forbidding ---
		'@typescript-eslint/ban-types': 'error', // Forbid usage of non-primitive types like Function.
		'@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }], // Forbid 'any' and suggest 'unknown'.
		'@typescript-eslint/no-invalid-void-type': 'error', // Prevent incorrect use of 'void' return type.
		'@typescript-eslint/no-unsafe-argument': 'error', // Type-checking safety rules (aggressive, good for strict projects).
		'@typescript-eslint/no-unsafe-assignment': 'error',
		'@typescript-eslint/no-unsafe-call': 'error',
		'@typescript-eslint/no-unsafe-return': 'error',

		// --- Readability & Clean Code ---
		'@typescript-eslint/adjacent-overload-signatures': 'error', // Group function overloads together.
		'@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }], // Prevent empty interfaces (except for single extension).
		'@typescript-eslint/parameter-properties': 'error', // Use shorthand class parameter properties.
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error', // Simplify boolean comparisons.
		'@typescript-eslint/no-use-before-define': 'off', // Default ESLint rule disabled as TS compilation handles this.

		// --- Correctness & Best Practices ---
		'@typescript-eslint/switch-exhaustiveness-check': 'error', // Ensure all cases are handled in switch statements.
		'@typescript-eslint/no-for-in-array': 'error', // Prevent iterating over arrays using `for-in`.
		'@typescript-eslint/no-misused-new': 'error', // Prevent misuse of the `new` keyword.
		'@typescript-eslint/no-this-alias': 'error', // Prevent using `const that = this;`.
		'@typescript-eslint/no-unnecessary-qualifier': 'error', // Remove unnecessary namespace qualifiers.
		'@typescript-eslint/no-unnecessary-type-assertion': 'error', // Remove redundant type assertions.
		'@typescript-eslint/no-unnecessary-type-constraint': 'error', // Remove redundant generic constraints (e.g., T extends unknown).
		'@typescript-eslint/prefer-for-of': 'error', // Prefer `for-of` over C-style loops where possible.
		'@typescript-eslint/prefer-literal-enum-member': 'error', // Prefer literal values in enum members.
		'@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: false }], // Enforce type safety in '+' operations.
		'@typescript-eslint/unified-signatures': 'error', // Merge function overloads into a single signature.

		// --- Assertions & Non-Null ---
		'@typescript-eslint/consistent-type-assertions': 'error', // Enforce one style of type assertion (`as` or `<>`).
		'@typescript-eslint/no-confusing-non-null-assertion': 'error', // Prevent confusing `!`.
		'@typescript-eslint/no-extra-non-null-assertion': 'error', // Remove unnecessary `!`.
		'@typescript-eslint/no-non-null-assertion': 'error', // **Forbid** the use of the non-null assertion operator (`!`).
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // Prevent use of `?.!` operator.
		'@typescript-eslint/prefer-as-const': 'error', // Prefer `as const` over literal type assertions.

		// --- Comments & References ---
		'@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }], // Ban `@ts-ignore` but allow `@ts-expect-error` with a reason.
		'@typescript-eslint/prefer-ts-expect-error': 'error', // Prefer `ts-expect-error` over `ts-ignore`.
		'@typescript-eslint/triple-slash-reference': [
			'error',
			{ path: 'never', types: 'never', lib: 'never' },
		], // Forbid triple-slash references.

		// --- Async Operations ---
		'no-void': 'off', // Disabled to allow use of `void` for fire-and-forget promises.
		'@typescript-eslint/await-thenable': 'error', // Ensure only thenable values are awaited.
		'@typescript-eslint/no-floating-promises': 'error', // Ensure promises are handled (e.g., awaited or caught).
		'@typescript-eslint/no-misused-promises': 'error', // Prevent passing promises to non-async functions.
		'@typescript-eslint/promise-function-async': 'error', // Require functions returning promises to be marked `async`.

		// --- Modern APIs ---
		'@typescript-eslint/prefer-includes': 'error', // Prefer `String.prototype.includes` over `indexOf > -1`.
		'@typescript-eslint/prefer-nullish-coalescing': 'error', // Prefer `??` over `||` for null/undefined checks.
		'@typescript-eslint/prefer-optional-chain': 'error', // Prefer `?.` over verbose null checks.
		'@typescript-eslint/prefer-string-starts-ends-with': 'error', // Prefer modern string methods.

		// --- Safety Rules Softened (Acknowledged Technical Debt/Migration) ---
		// These rules are disabled because they are often difficult to implement immediately across a large codebase.
		// They should ideally be enabled once possible to enforce full type safety.
		'@typescript-eslint/no-unsafe-member-access': 'off',
	},
};
