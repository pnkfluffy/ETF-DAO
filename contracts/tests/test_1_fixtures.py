from brownie import accounts


def test_router_fixture(router):
    assert router.WETH() == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"


def test_factory_fixture(factory):
    assert factory.feeTo() == "0x0000000000000000000000000000000000000000"


def test_fundFactory_fixture(fundFactory, router):
    assert fundFactory.routerAddress() == router.address
