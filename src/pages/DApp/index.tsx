import MetaMaskCard from '@/components/connectCards/MetaMaskCard';
import InfoContractInterface from './components/Contracts';

const DApp = () => {
  return (
    <>
      <MetaMaskCard />
      <hr />
      <InfoContractInterface />
    </>
  );
};

export default DApp;
