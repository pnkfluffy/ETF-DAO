# export WEB3_INFURA_PROJECT_ID=b514e428c8a3499f876689a88201287d
# export ETHERSCAN_TOKEN=HAZGKZP2943C1U13E8A3J4IBBMHNJ7AA8K
# brownie run deploy.py --network rinkeby

import json
from brownie import accounts, Fund, FundFactory

def main():
	deployer = accounts.load('deployment_account')
	router = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
	factory = FundFactory.deploy(router, {'from': deployer}, publish_source = True)

