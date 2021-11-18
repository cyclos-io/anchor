const anchor = require("@project-serum/anchor");

describe("basic-0", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.local());
  const provider = anchor.getProvider();
  const program = anchor.workspace.Shared;

  // it("Init", async () => {
  //   // #region code
  //   // Read the deployed program from the workspace.

  //   // Execute the RPC.
  //   await program.rpc.initialize();
  //   // #endregion code
  // });


  const filterable1 = anchor.web3.Keypair.generate();

  const data2 = anchor.web3.Keypair.generate();
  const data3 = anchor.web3.Keypair.generate();

  it("vector", async () => {
    const tx = await program.rpc.testVecMut(filterable1.publicKey, {
      accounts: {
        data: [data2.publicKey, data3.publicKey],
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [data2, data3],
    });

    let data2Account = await program.account.counter.fetch(data2.publicKey)
    let data3Account = await program.account.counter.fetch(data3.publicKey)

    console.log(data2Account, data3Account);
  });


});