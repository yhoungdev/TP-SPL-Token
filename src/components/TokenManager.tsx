import React, { useState } from 'react';
import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
  burn,
  approve,
} from '@solana/spl-token';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle  } from "@/components/ui/card"
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';

const TokenManager: React.FC = () => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [payer, setPayer] = useState<Keypair | null>(null);
  const [token, setToken] = useState<PublicKey | null>(null);
  const [mintAddress, setMintAddress] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [delegateAddress, setDelegateAddress] = useState<string>('');

  const initializeConnection = () => {
    const newConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
    setConnection(newConnection);
    const newPayer = Keypair.generate();
    setPayer(newPayer);
  };

  const createToken = async () => {
    if (!connection || !payer) return;
    const newToken = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      9
    );
    setToken(newToken);
    setMintAddress(newToken.toBase58());
  };

  const mintToken = async () => {
    if (!token || !payer || !connection) return;
    const destPublicKey = new PublicKey(recipientAddress);
    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      token,
      destPublicKey
    );
    await mintTo(
      connection,
      payer,
      token,
      associatedTokenAccount.address,
      payer,
      Number(amount)
    );
  };

  const transferToken = async () => {
    if (!token || !payer || !connection) return;
    const sourcePublicKey = payer.publicKey;
    const destPublicKey = new PublicKey(recipientAddress);
    const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      token,
      sourcePublicKey
    );
    const destTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      token,
      destPublicKey
    );
    await transfer(
      connection,
      payer,
      sourceTokenAccount.address,
      destTokenAccount.address,
      payer,
      Number(amount)
    );
  };

  const burnToken = async () => {
    if (!token || !payer || !connection) return;
    const sourcePublicKey = payer.publicKey;
    const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      token,
      sourcePublicKey
    );
    await burn(
      connection,
      payer,
      sourceTokenAccount.address,
      token,
      payer,
      Number(amount)
    );
  };

  const delegateToken = async () => {
    if (!token || !payer || !connection) return;
    const sourcePublicKey = payer.publicKey;
    const delegatePublicKey = new PublicKey(delegateAddress);
    const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      token,
      sourcePublicKey
    );
    await approve(
      connection,
      payer,
      sourceTokenAccount.address,
      delegatePublicKey,
      payer,
      Number(amount)
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
    <CardHeader className="bg-primary text-primary-foreground">
      <CardTitle className="text-2xl font-bold">Solana Token Manager</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6 p-6">
      <div className="flex gap-4">
        <Button onClick={initializeConnection} className="flex-1">Initialize Connection</Button>
        <Button onClick={createToken} className="flex-1">Create Token</Button>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={mintToken} className="flex-1">Mint</Button>
          <Button onClick={transferToken} className="flex-1">Transfer</Button>
          <Button onClick={burnToken} className="flex-1">Burn</Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="delegate">Delegate Address</Label>
          <Input
            id="delegate"
            placeholder="Enter delegate address"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
          />
        </div>
        <Button onClick={delegateToken} className="w-full">Delegate Token</Button>
      </div>
      
      <div className="bg-secondary p-4 rounded-md space-y-2">
        <p className="text-sm"><span className="font-semibold">Mint Address:</span> {mintAddress || 'Not created'}</p>
        <p className="text-sm"><span className="font-semibold">Payer Public Key:</span> {payer?.publicKey.toBase58() || 'Not initialized'}</p>
      </div>
    </CardContent>
  </Card>
  );
};

export default TokenManager;