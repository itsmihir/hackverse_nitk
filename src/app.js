App = {
    loading: false,
    contracts: {},

    load: async() => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async() => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                    // Acccounts now exposed
                web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
                // Acccounts always exposed
            web3.eth.sendTransaction({ /* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async() => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
    },

    loadContract: async() => {
        // Create a JavaScript version of the smart contract
        const Dbank = await $.getJSON('Dbank.json')
        App.contracts.Dbank = TruffleContract(Dbank)
        App.contracts.Dbank.setProvider(App.web3Provider)

        // Hydrate the smart contract with values from the blockchain
        App.Dbank = await App.contracts.Dbank.deployed()
    },

    render: async() => {

        // Render Account
        $('.test').html(`Your Account:${App.account}`);


        // TODO : update the value of the balance of the user



        var instance;
        App.contracts.Dbank.deployed().then(function(_instance) {
            instance = _instance;
            return instance.getBalance(App.account);
        }).then(function(balance) {
            console.log(`this :${App.instance}`);

            $('.showBalance').html(`<h3>Your Balance : ${balance.toNumber()}</h3> `);
        })

    },

    deposit: async() => {
        var instance;
        const receiverAddress = App.address;
        console.log(receiverAddress);

        var amt = 0;
        amt = parseInt($('#deposit').val());

        async function fun() {
            await instance.deposit(amt).then(function() {
                location.reload();
                console.log('done');
            })
        }

        App.contracts.Dbank.deployed().then(function(_instance) {
            instance = _instance;
            return instance.deposit(amt, { from: App.account, value: web3.toWei(amt, "ether"), });
            // web3.eth.sendTransaction({ from: App.account, to: instance.account, value: web3.toWei(amt, "ether") }, (err) => {
            //     if (!err) fun();
            // });

        }).then(() => location.reload());


    },

    withdraw: async() => {
        var instance;

        var amt = 0;
        amt = parseInt($('#withdraw').val());
        console.log(amt);



        App.contracts.Dbank.deployed().then(function(_instance) {
            instance = _instance;


            // TODO : code to check the balace of the user


            return instance.withDraw(amt, { from: App.account }, );
            // web3.eth.sendTransaction({ from: App.account, to: instance.account, value: web3.toWei(amt, "ether") }, (err) => {
            //     if (!err) fun();
            // });

        }).then((e) => {
            location.reload();
            console.log(e);
        })

    },
}

$(() => {
    $(window).load(() => {
        App.load()
    });
});