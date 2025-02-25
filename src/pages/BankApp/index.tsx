import MetaMaskCard from '@/components/connectCards/MetaMaskCard';
import BankContractInterface from './components/BankContracts';

const DApp = () => {
  return (
    <>
      <MetaMaskCard />
      <hr />
      <BankContractInterface />
    </>
  );
};

export default DApp;
