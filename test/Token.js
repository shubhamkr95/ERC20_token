const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
 let Token;
 let hardhatToken;
 let owner;
 let addr1;
 let addr2;
 let addrs;

 beforeEach(async function () {
  // get contract factory and signers here
  Token = await ethers.getContractFactory("Token");
  [owner, addr1, addr2, addrs] = await ethers.getSigners();

  hardhatToken = await Token.deploy();
 });

 describe("Deployment", function () {
  // owner variable stored in contract to be equal signer's owner
  it("Should set right owner", async function () {
   expect(await hardhatToken.owner()).to.equal(owner.address);
  });

  // assign total supply to the owner
  it("Should assign total supply to the owner address", async function () {
   const ownerBalance = await hardhatToken.balanceOf(owner.address);
   expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
 });

 describe("Transactions", async function () {
  // transfer tokens between accounts
  it("should Transfer token between accounts", async function () {
   // transfer 50 tokens from owner to addr1
   await hardhatToken.transfer(addr1.address, 50);
   const addr1Balance = await hardhatToken.balanceOf(addr1.address);
   expect(addr1Balance).to.equal(50);

   //transfer 50 tokens from addr1 to addr2
   await hardhatToken.transfer(addr2.address, 50);
   const addr2Balance = await hardhatToken.balanceOf(addr2.address);
   expect(addr2Balance).to.equal(50);
  });

  // failed if sender doen'nt have enough tokens
  it("should fail if sender don't have enough tokens", async function () {
   const initialOwnerbalance = await hardhatToken.balanceOf(owner.address);

   // try to send 1 token fronm addr1 to owner
   await expect(
    hardhatToken.connect(addr1).transfer(owner.address, 1)
   ).to.be.revertedWith("not enough tokens");

   // owner balance should have change
   expect(await hardhatToken.balanceOf(owner.address)).to.equal(
    initialOwnerbalance
   );
  });

  // check update after transfer
  it("Should update balances after transfer", async function () {
   const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

   // transfer 100 tokens from oner to addr1
   await hardhatToken.transfer(addr1.address, 100);

   // transfer 50 tokens from owner to addr2
   await hardhatToken.transfer(addr2.address, 150);

   // chack balance
   const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
   expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(250));

   // check addr1 balance
   const addr1Balance = await hardhatToken.balanceOf(addr1.address);
   expect(addr1Balance).to.equal(100);

   // check addr2 balance
   const addr2Balance = await hardhatToken.balanceOf(addr2.address);
   expect(addr2Balance).to.equal(150);
  });
 });
});
