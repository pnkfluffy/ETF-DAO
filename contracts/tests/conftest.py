import pytest
from brownie import Contract, FundFactory, TestToken, accounts
from brownie.network.state import Chain

# to run brownie test --network mainnet-fork


@pytest.fixture(scope="session")
def router():
    return Contract.from_explorer("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")


@pytest.fixture(scope="session")
def factory():
    return Contract.from_explorer("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")


@pytest.fixture(scope="session")
def token1(router, factory):
    token1 = accounts[0].deploy(TestToken, "token 1", "TOKEN1", 1000000e18)
    factory.createPair(router.WETH(), token1, {"from": accounts[0]})
    token1.approve(router, 2 ** 256 - 1, {"from": accounts[0]})
    router.addLiquidityETH(
        token1,
        100000e18,
        0,
        0,
        accounts[0],
        Chain().time() + 1000,
        {"from": accounts[0], "value": "1 ether"},
    )
    return token1


@pytest.fixture(scope="session")
def token2(router, factory):
    token2 = accounts[0].deploy(TestToken, "token 2", "TOKEN2", 1000000e18)
    factory.createPair(router.WETH(), token2, {"from": accounts[0]})
    token2.approve(router, 2 ** 256 - 1, {"from": accounts[0]})
    router.addLiquidityETH(
        token2,
        100000e18,
        0,
        0,
        accounts[0],
        Chain().time() + 1000,
        {"from": accounts[0], "value": "1 ether"},
    )
    return token2


@pytest.fixture(scope="session")
def token3(router, factory):
    token3 = accounts[0].deploy(TestToken, "token 3", "TOKEN3", 1000000e18)
    factory.createPair(router.WETH(), token3, {"from": accounts[0]})
    token3.approve(router, 2 ** 256 - 1, {"from": accounts[0]})
    router.addLiquidityETH(
        token3,
        100000e18,
        0,
        0,
        accounts[0],
        Chain().time() + 1000,
        {"from": accounts[0], "value": "1 ether"},
    )
    return token3


@pytest.fixture(scope="session")
def fundFactory(router):
    fundFactory = accounts[0].deploy(FundFactory, router.address)
    return fundFactory
