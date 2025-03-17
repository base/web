/* eslint-disable */
import { useAccount } from 'wagmi';
import arraysGoerli from './assets/deployments/base-goerli/ArraysUT.json';
import basicMathGoerli from './assets/deployments/base-goerli/BasicMathUnitTest.json';
import controlStructuresGoerli from './assets/deployments/base-goerli/ControlStructuresUT.json';
import erc20Goerli from './assets/deployments/base-goerli/ERC20UT.json';
import erc721Goerli from './assets/deployments/base-goerli/ERC721UT.json';
import errorGoerli from './assets/deployments/base-goerli/ErrorTriageUT.json';
import importsGoerli from './assets/deployments/base-goerli/ImportsUT.json';
import inheritanceGoerli from './assets/deployments/base-goerli/InheritanceUnitTest.json';
import mappingGoerli from './assets/deployments/base-goerli/MappingsUT.json';
import minimalTokenGoerli from './assets/deployments/base-goerli/MinimalTokenUT.json';
import newGoerli from './assets/deployments/base-goerli/NewUT.json';
import storageGoerli from './assets/deployments/base-goerli/StorageUT.json';
import structsGoerli from './assets/deployments/base-goerli/StructsUT.json';

import arraysSepolia from './assets/deployments/base-sepolia/ArraysUT.json';
import basicMathSepolia from './assets/deployments/base-sepolia/BasicMathUnitTest.json';
import controlStructuresSepolia from './assets/deployments/base-sepolia/ControlStructuresUT.json';
import erc20Sepolia from './assets/deployments/base-sepolia/ERC20UT.json';
import erc721Sepolia from './assets/deployments/base-sepolia/ERC721UT.json';
import errorSepolia from './assets/deployments/base-sepolia/ErrorTriageUT.json';
import importsSepolia from './assets/deployments/base-sepolia/ImportsUT.json';
import inheritanceSepolia from './assets/deployments/base-sepolia/InheritanceUT.json';
import mappingSepolia from './assets/deployments/base-sepolia/MappingsUT.json';
import minimalTokenSepolia from './assets/deployments/base-sepolia/MinimalTokenUT.json';
import newSepolia from './assets/deployments/base-sepolia/NewUT.json';
import storageSepolia from './assets/deployments/base-sepolia/StorageUT.json';
import structsSepolia from './assets/deployments/base-sepolia/StructsUT.json';

import img1 from './assets/images/Base_Camp_NFT_01.png';
import img2 from './assets/images/Base_Camp_NFT_02.png';
import img3 from './assets/images/Base_Camp_NFT_03.png';
import img4 from './assets/images/Base_Camp_NFT_04.png';
import img5 from './assets/images/Base_Camp_NFT_05.png';
import img7 from './assets/images/Base_Camp_NFT_07.png';
import img8 from './assets/images/Base_Camp_NFT_08.png';
import img10 from './assets/images/Base_Camp_NFT_10.png';
import img12 from './assets/images/Base_Camp_NFT_12.png';
import img13 from './assets/images/Base_Camp_NFT_13.png';
import img14 from './assets/images/Base_Camp_NFT_14.png';
import img15 from './assets/images/Base_Camp_NFT_15.png';
import img19 from './assets/images/Base_Camp_NFT_19.png';
import { baseGoerli, baseSepolia, base } from 'viem/chains';

const nftData = {
  1: {
    img: img1,
    title: 'Deploying to a Testnet',
    url: '/base-camp/docs/deployment-to-testnet/deployment-to-testnet-exercise',
  },
  2: {
    img: img2,
    title: 'Control Structures',
    url: '/base-camp/docs/control-structures/control-structures-exercise',
  },
  3: {
    img: img3,
    title: 'Storage',
    url: '/base-camp/docs/storage/storage-exercise',
  },
  4: {
    img: img4,
    title: 'Arrays',
    url: '/base-camp/docs/arrays/arrays-exercise',
  },
  5: {
    img: img5,
    title: 'Mappings',
    url: '/base-camp/docs/mappings/mappings-exercise',
  },
  7: {
    img: img7,
    title: 'Structs',
    url: '/base-camp/docs/structs/structs-exercise',
  },
  8: {
    img: img8,
    title: 'Inheritance',
    url: '/base-camp/docs/inheritance/inheritance-exercise',
  },
  10: {
    img: img10,
    title: 'Errors',
    url: '/base-camp/docs/error-triage/error-triage-exercise',
  },
  12: {
    img: img12,
    title: 'The "new" keyword',
    url: '/base-camp/docs/new-keyword/new-keyword-exercise',
  },
  13: {
    img: img13,
    title: 'Minimal Tokens',
    url: '/base-camp/docs/minimal-tokens/minimal-tokens-exercise',
  },
  14: {
    img: img14,
    title: 'ERC-20 Tokens',
    url: '/base-camp/docs/erc-20-token/erc-20-exercise',
  },
  15: {
    img: img15,
    title: 'ERC-721 Tokens',
    url: '/base-camp/docs/erc-721-token/erc-721-exercise',
  },
  19: {
    img: img19,
    title: 'Imports',
    url: '/base-camp/docs/imports/imports-exercise',
  },
};

const baseGoerliDeployments = {
  1: basicMathGoerli,
  2: controlStructuresGoerli,
  3: storageGoerli,
  4: arraysGoerli,
  5: mappingGoerli,
  7: structsGoerli,
  8: inheritanceGoerli,
  10: errorGoerli,
  12: newGoerli,
  13: minimalTokenGoerli,
  14: erc20Goerli,
  15: erc721Goerli,
  19: importsGoerli,
};

const baseSepoliaDeployments = {
  1: basicMathSepolia,
  2: controlStructuresSepolia,
  3: storageSepolia,
  4: arraysSepolia,
  5: mappingSepolia,
  7: structsSepolia,
  8: inheritanceSepolia,
  10: errorSepolia,
  12: newSepolia,
  13: minimalTokenSepolia,
  14: erc20Sepolia,
  15: erc721Sepolia,
  19: importsSepolia,
};

function useNFTData() {
  const { chain } = useAccount();

  // Map the correct deployment based on the chain
  let deployments = {};
  switch (chain?.id || 84532) {
    case baseGoerli.id:
      deployments = baseGoerliDeployments;
      break;
    case baseSepolia.id:
    case base.id: // Also support Base Mainnet (use Sepolia deployments)
      deployments = baseSepoliaDeployments;
      break;
    default:
      throw new Error(
        `Unsupported network (Chain ID: ${chain?.id}). Please connect to Base Sepolia.`,
      );
      break;
  }

  // Map the correct NFT data based on the chain
  Object.keys(nftData).forEach((key) => {
    nftData[key].deployment = deployments[key];
  });

  return nftData;
}

export default useNFTData;
