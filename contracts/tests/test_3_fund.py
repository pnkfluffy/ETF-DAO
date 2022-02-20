from brownie import Contract, Fund, accounts


def test_join(fundFactory, token1, token2, token3):
    fund = Contract.from_abi("Fund", fundFactory.getFundBySymbol("SYMBOL"), Fund.abi)
    assert accounts[1].balance() == 100e18
    fund.join(1e18, {"from": accounts[1], "value": "0.1 ether"})
    assert accounts[1].balance() != 100e18

    assert fund.balanceOf(accounts[1]) == 1e18
    assert token1.balanceOf(fund) == 1e18
    assert fund.balance() == 0


def test_exit(fundFactory, token1):
    fund = Contract.from_abi("Fund", fundFactory.getFundBySymbol("SYMBOL"), Fund.abi)
    assert accounts[1].balance() != 100e18
    fund.exit(1e18, {"from": accounts[1]})

    assert fund.balanceOf(accounts[1]) == 0
    assert token1.balanceOf(fund) == 0
    assert fund.balance() == 0
