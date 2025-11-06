import Modal from 'apps/web/src/components/Modal';
import data from 'apps/web/src/data/usernamePriceDecayTable.json';
import { useBasenamesLaunchTime } from 'apps/web/src/hooks/useBasenamesLaunchTime';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatEther } from 'viem';

type CustomTooltipProps = {
  active?: boolean;
  baseSingleYearEthCost?: bigint;
  launchTimeSeconds?: bigint;
  payload: [
    {
      dataKey: 'premium';
      name: 'premium';
      payload: { hours: number; premium: number };
      value: number;
    },
  ];
};

function CustomTooltip({
  active,
  payload,
  baseSingleYearEthCost,
  launchTimeSeconds,
}: CustomTooltipProps) {
  if (active && payload?.length && launchTimeSeconds && baseSingleYearEthCost) {
    const premium = payload[0].value;
    const hours = payload[0].payload.hours;
    const seconds = hours * 60 * 60;
    const tooltipSeconds = seconds + Number(launchTimeSeconds);
    const timeOfPremium = new Date(tooltipSeconds * 1000).toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const nameBasePrice = Number(formatEther(baseSingleYearEthCost));
    const formattedBasePrice = nameBasePrice.toLocaleString(undefined, {
      maximumFractionDigits: 6,
    });
    const formattedPremium = premium.toLocaleString(undefined, {
      maximumFractionDigits: 6,
    });
    const total = premium + nameBasePrice;
    const formattedTotal = total.toLocaleString(undefined, {
      maximumFractionDigits: 4,
    });
    return (
      <div className="flex flex-col gap-1 rounded-xl bg-illoblack px-3 py-2 text-white">
        <div>{timeOfPremium}</div>
        <div>1 year registration: {formattedBasePrice} ETH</div>
        <div>Premium: {formattedPremium} ETH</div>
        <div>Estimated total: {formattedTotal} ETH</div>
      </div>
    );
  }
  return null;
}

type PremiumExplainerModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  premiumEthAmount: bigint | undefined;
  baseSingleYearEthCost: bigint;
};
const chartMarginValues = { top: 2, right: 2, left: 2, bottom: 2 };
export function PremiumExplainerModal({
  isOpen,
  toggleModal,
  premiumEthAmount,
  baseSingleYearEthCost,
}: PremiumExplainerModalProps) {
  const { data: launchTimeSeconds } = useBasenamesLaunchTime();

  if (!premiumEthAmount || !baseSingleYearEthCost) return null;
  const formattedOneYearCost = Number(formatEther(baseSingleYearEthCost)).toLocaleString(
    undefined,
    {
      maximumFractionDigits: 6,
    },
  );
  const formattedPremium = Number(formatEther(premiumEthAmount)).toLocaleString(undefined, {
    maximumFractionDigits: formattedOneYearCost.length - 2,
  });
  const ethTotal = premiumEthAmount + baseSingleYearEthCost;
  const formattedTotal = Number(formatEther(ethTotal)).toLocaleString(undefined, {
    maximumFractionDigits: formattedOneYearCost.length - 2,
  });
  return (
    <Modal isOpen={isOpen} onClose={toggleModal} title="">
      <div className="flex max-w-[491px] flex-1 flex-col gap-3">
        <h1 className="w-full text-2xl font-bold">This name has a temporary premium</h1>
        <p className="mb-3 text-illoblack">
          To ensure fair distribution of Basenames, all names have a temporary premium starting at
          100 ETH that then decays exponentially to 0 over 36 hours.
        </p>
        <div className="grid  grid-cols-2 grid-rows-4">
          <div className="col-span-2 mb-2 text-sm font-medium uppercase text-gray-60">
            current price
          </div>
          <div className="font-medium">1 year registration</div>
          <div className="justify-self-end">{formattedOneYearCost} ETH</div>
          <div className="font-medium">Temporary premium</div>
          <div className="justify-self-end">{formattedPremium} ETH</div>
          <div className="font-medium">Estimated total</div>
          <div className="justify-self-end">{formattedTotal} ETH</div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium uppercase text-gray-60">See price over time</p>
          <ResponsiveContainer height={140} width="100%">
            <LineChart
              data={data}
              margin={chartMarginValues}
              className="rounded-xl border border-[#5B616E33]"
            >
              <defs>
                <linearGradient
                  id="colorUv"
                  x1="2"
                  y1="59.3809"
                  x2="398"
                  y2="59.3809"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#45E1E5" />
                  <stop offset="0.880435" stopColor="#0052FF" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="premium"
                stroke="url(#colorUv)"
                dot={false}
                strokeWidth={4}
              />
              <CartesianGrid
                vertical
                stroke="#5B616E33"
                horizontal={false}
                className="rounded-xl border border-palette-line"
              />
              <Tooltip
                content={
                  // @ts-expect-error type wants an unnecessary prop
                  <CustomTooltip
                    baseSingleYearEthCost={baseSingleYearEthCost}
                    launchTimeSeconds={launchTimeSeconds}
                  />
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Modal>
  );
}
