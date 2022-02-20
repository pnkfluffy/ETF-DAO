from brownie import Contract, Fund, accounts


def test_createFund(fundFactory, token1, token2):
    assert fundFactory.allFundsLength() == 0
    fundFactory.createFund("fund name", "SYMBOL", [token1, token2], [1, 2])
    assert fundFactory.allFundsLength() == 1


def test_getFundByName(fundFactory):
    fund = Contract.from_abi("Fund", fundFactory.getFundByName("fund name"), Fund.abi)
    assert fund.symbol() == "SYMBOL"


def test_getFundBySymbol(fundFactory):
    fund = Contract.from_abi("Fund", fundFactory.getFundBySymbol("SYMBOL"), Fund.abi)
    assert fund.name() == "fund name"


def test_allFunds(fundFactory):
    funds = fundFactory.getAllFunds()
    assert len(funds) == 1
    assert funds[0] == fundFactory.getFundByName("fund name")
    assert funds[0] == fundFactory.getFundBySymbol("SYMBOL")
