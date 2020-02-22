class Game{

    collectedEgg = 0;
    currentEgg = 0;
    soldEgg = 0;
    money = 1000;
    fodder = 2000;
    unitFodderCost = 25;
    fodderCost = 200;
    demandRate = 0;
    price = 5;
    chickNumber = 1;
    lastCollectedEggCount = 0;
    lastCollectedEggRate = 0;
    lastCollectedEggRateTs = Date.now();
    newTitle = 'Petrol Fiyatları arttı yeme zam ';
    FodderCostLastUpdated = Date.now();
    autoCollectorsLastDate = Date.now();
    collectEgg = () =>{
        this.currentEgg++; 
        this.collectedEgg++;
        this.fodder -= this.unitFodderCost * this.chickNumber;
        
    }
    
    canCollectEgg = () =>{
        return this.fodder >= this.unitFodderCost * this.chickNumber;
    }

    update = () =>{
        //burası düzelecek 21.02.2020 01.41 SON KALINAN YER
        if( Date.now() - this.autoCollectorsLastDate > 1000){
            this.currentEgg += this.autoCollector.farmerCount * this.autoCollector.farmerRate; this.collectedEgg += this.autoCollector.farmerCount * this.autoCollector.farmerRate;
            this.currentEgg += this.autoCollector.tractorCount * this.autoCollector.tractorRate; this.collectedEgg += this.autoCollector.tractorCount * this.autoCollector.tractorRate;
            this.currentEgg += this.autoCollector.windHillCount * this.autoCollector.windHillRate; this.collectedEgg += this.autoCollector.windHillCount * this.autoCollector.windHillRate;
            this.fodder -= this.autoCollector.farmerCount * this.autoCollector.farmerRate * this.chickNumber * this.unitFodderCost;
            this.fodder -= this.autoCollector.tractorCount * this.autoCollector.tractorRate * this.chickNumber * this.unitFodderCost;
            this.fodder -= this.autoCollector.windHillCount * this.autoCollector.windHillRate * this.chickNumber * this.unitFodderCost;
            this.autoCollectorsLastDate = Date.now();
        }
        
       

        if(Date.now() - this.FodderCostLastUpdated > 5000){
            this.fodderCost = Math.floor(Math.random() * 250 + 100);
            this.FodderCostLastUpdated = Date.now();
        }

        if (Date.now() - this.lastCollectedEggRateTs > 5000){
            this.lastCollectedEggRateTs = Date.now();
            this.lastCollectedEggRate = Math.floor((this.collectedEgg - this.lastCollectedEggCount) /5);
            this.lastCollectedEggCount = this.collectedEgg;
        }

        if(this.fodderCost < 200){
            this.newTitle = 'Ekonomik durumu kötü olan çiftçiye can suyu yem ucuzladı';
        }else{
            this.newTitle = 'Çiftciler acı çekiyor Şuan yem pahalı'
        }

        this.updateDemand();

        if(this.currentEgg > 0 && Math.random() * 100 < this.demandRate  && this.currentEgg > 0){
            this.purchaseEgg();
        }
    }

    autoCollector = {
        farmerCount : 0,
        farmerCost : 500,
        farmerRate : 1,
        tractorCount : 0,
        tractorCost : 1500,
        tractorRate : 4,
        windHillCount : 0,
        windHillCost : 5000,
        windHillRate: 10
    }

    canBuyAutoCollector = type =>{
        switch(type){
            case 'Farmer':
                return this.money >= this.autoCollector.farmerCost;
            case 'Tractor':
                return this.money >= this.autoCollector.tractorCost;
            case 'WindHill':
                return this.money >= this.autoCollector.windHillCost;
            default:
                return false;
        }
    }

    buyAutoCollector = type =>{
        switch (type) {
            case 'Farmer':
                console.log(this.autoCollector.farmerCost);
                
                this.autoCollector.farmerCount++;
                this.money -= this.autoCollector.farmerCost;
                this.autoCollector.farmerCost += 100;
                break;
                
            case 'Tractor':
                this.autoCollector.tractorCount++;
                this.money -= this.autoCollector.tractorCost;
                this.autoCollector.tractorCost += 250;
                break;
                
            case 'WindHill':
                this.autoCollector.windHillCount++;
                this.money -= this.autoCollector.windHillCost;
                this.autoCollector.windHillCost += 500;
                break;
            
            default:
                return false;
             
        }
    }

    updateDemand = () =>{
        const rate = 100- [(this.price / 16) * 100];
        this.demandRate = Math.floor(Math.min(Math.max(0, rate), 100)); 

    }

    purchaseEgg = () =>{
        this.currentEgg -= this.chickNumber;
        this.money += this.price;
    }

    canBuyFodder = () =>{
        
        return this.money >= this.fodderCost;

    }

    buyFodder = () =>{
        
        this.fodder += 2000;
        this.money -= this.fodderCost;
        this.fodderCost += 42;
        this.FodderCostLastUpdated = Date.now();
    }

    increasePrice = () =>{
        this.price +=1;
    }

    decreasePrice = () =>{
        this.price -= 1;
    }

    canDecreasePrice = () =>{
        return this.price > 1;
    }
    
}

export default Game;