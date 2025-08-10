import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount, useClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatEther } from "viem";

const Dashboard = () => {
  const account = useAccount();
  const client = useClient();
  const [txs, setTxs] = useState<any[]>([]);

  useEffect(() => {
    if (account.address && client?.chain.blockExplorers?.default.apiUrl) {
      axios.get(`${client.chain.blockExplorers.default.apiUrl}?module=account&action=txlist&address=${account.address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=${import.meta.env.VITE_ETHERSCAN_KEY}`)
        .then((res) => {
          setTxs(res.data.result);
        }).catch(console.error);
    }
  }, [account.address, client?.chain.blockExplorers?.default.apiUrl]);

  return (
    <div className="min-h-screen container mx-auto pt-5">
      <ConnectButton showBalance={{ smallScreen: true, largeScreen: true }} />
      <div className="mt-5 border">
        <div className="grid grid-cols-12 px-4 bg-white/20 py-2">
          <div className="col-span-2">Hash</div>
          <div className="col-span-4">From</div>
          <div className="col-span-4">To</div>
          <div className="col-span-2">Value</div>
        </div>
        {txs.map((tx, key) => <div key={key} className="grid grid-cols-12 px-4 py-2 hover:bg-white/10">
          <div className="col-span-2">
            <a className="underline text-blue-400" href={`https://etherscan.io/tx/${tx.hash}`} target="_blank">{tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}</a>
          </div>
          <div className="col-span-4">{tx.from}</div>
          <div className="col-span-4">{tx.to ? tx.to : tx.contractAddress}</div>
          <div className="col-span-2">{formatEther(tx.value)} ETH</div>
        </div>)}
      </div>
    </div>
  )
}

export default Dashboard;