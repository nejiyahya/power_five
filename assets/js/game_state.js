var GameState = {

    preload: function() {
        engine.game.load.image('background', 'assets/images/bg.png');
        engine.game.load.image('player', 'assets/images/player.png');
        engine.game.load.image('cars', 'assets/images/mobil.png');
        engine.game.load.image('bus', 'assets/images/bus.png');
        engine.game.load.image('oil', 'assets/images/oil.png');
        engine.game.load.image('air', 'assets/images/air.png');
        engine.game.load.image('header', 'assets/images/header.png');
        engine.game.load.image('bgButton', 'assets/images/bg_button.png');
        engine.game.load.image('btnLeft', 'assets/images/btnLeft.png');
        engine.game.load.image('btnRight', 'assets/images/btnRight.png');
        engine.game.load.image('progress', 'assets/images/progress.png');
        engine.game.load.image('progressBar', 'assets/images/progressBar.png');
        engine.game.load.audio('bgMusic', 'assets/sound/timetorun.mp3');  
    },

    create: function() {
        var self = this;
        self.maxScore = 45;
        engine.score = 0;
        this.leqSpeed = 295;
        this.leqDelay = this.leqSpeed/2.4;
        this.countDelay = 0;

        this.speed = 5.9;
        this.keyLeft = this.keyRight = false;
        this.isFinish = false;

        this.sound = engine.game.add.audio('bgMusic');
        this.sound.play('',0,1,true);
        
        this.bgGame = engine.game.add.tileSprite(0, 0, engine.game.width, engine.game.height, 'background');
        
        this.header = engine.game.add.sprite(engine.game.world.centerX,0,'header');
        this.header.anchor.set(0.5,0);
        this.header.fixedToCamera = true;

        this.bgButton = engine.game.add.sprite(engine.game.world.centerX,engine.game.height,'bgButton');
        this.bgButton.anchor.set(0.5,1);
        this.bgButton.fixedToCamera = true;

        this.btnLeft = engine.game.add.sprite(engine.game.world.centerX-60,engine.game.height-20,'btnLeft');
        this.btnLeft.anchor.set(0.5,1);
        this.btnLeft.inputEnabled = true;
        this.btnLeft.fixedToCamera = true;
        this.btnLeft.events.onInputDown.add(function(){
            self.keyLeft = true;
        });
         this.btnLeft.events.onInputUp.add(function(){
            self.keyLeft = false;
        });

        this.btnRight = engine.game.add.sprite(engine.game.world.centerX+60,engine.game.height-20,'btnRight');
        this.btnRight.anchor.set(0.5,1);
        this.btnRight.inputEnabled = true;
        this.btnRight.fixedToCamera = true;
        this.btnRight.events.onInputDown.add(function(){
            self.keyRight = true;
        });
         this.btnLeft.events.onInputUp.add(function(){
            self.keyRight = false;
        });

        this.progress = engine.game.add.sprite(3,45,'progress');
        this.progress.anchor.set(0,0);
        this.progress.fixedToCamera = true;

        this.progressBar = engine.game.add.sprite(35,engine.game.height-130,'progressBar');
        this.progressBar.anchor.set(0.5,1);
        this.progressBar.fixedToCamera = true;
        this.progressBar.scale.y = 0;

        this.player=engine.game.add.sprite(100,390,'player');
        engine.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;

        this.cars=engine.game.add.group();
        this.cars.enableBody=true;
        this.cars.createMultiple(3,'cars');

        this.bus=engine.game.add.group();
        this.bus.enableBody=true;
        this.bus.createMultiple(3,'bus');

        this.oil=engine.game.add.group();
        this.oil.enableBody=true;
        this.oil.createMultiple(3,'oil');

        this.air=engine.game.add.group();
        this.air.enableBody=true;
        this.air.createMultiple(3,'air');

        engine.game.time.events.loop(2000,this.enmyPositions, this);
        this.cursors = engine.game.input.keyboard.createCursorKeys();
    },
    
    update: function() {
        this.player.body.velocity.x = 0;

        if((this.cursors.left.isDown || this.keyLeft) && this.player.body.left>100){
            this.player.body.velocity.x = -600;
        }
        else if((this.cursors.right.isDown || this.keyRight) && this.player.body.left<180){
            this.player.body.velocity.x = 600;
        }

        this.countVelocity();
        this.bgGame.tilePosition.y += (this.speed/2)+Math.floor((((this.leqDelay-this.countDelay)/this.leqDelay)*(this.speed/2)));

        if(this.countDelay>0){
            this.countDelay-=(this.leqDelay/10);
        }
        else{
            this.countDelay=0;
        }   

        engine.game.physics.arcade.overlap(this.player, this.cars, this.gameOver, null, this);
        engine.game.physics.arcade.overlap(this.player, this.bus, this.gameOver, null, this);
        engine.game.physics.arcade.overlap(this.player, this.oil, this.reduceVelocityOil, null, this);
        engine.game.physics.arcade.overlap(this.player, this.air, this.reduceVelocityAir, null, this);
    }, 

    enmyPositions: function() {  
        var choose; 
        choose = Math.random();
        var arr_pos_air = [104,176,104,176];
        var arr_pos_oil = [100,173,100,173];
        var rand = Math.floor(Math.random()*arr_pos_oil.length);

        if(choose>=0 && choose<0.25){
            this.addOneCar(120,0);   
            if(engine.score>5 && engine.score<=10){
                this.addOneOil(173,0);
            }
        }
        if(choose>=0.25 && choose<0.50){
            if(engine.score>10){
                this.addOneOil(100,0);
            }
            this.addOneBus(190,0); 
        }
        else if(choose>=0.50 && choose<0.75){
            if(engine.score>10 && engine.score<15){
                this.addOneBus(190,0);
                this.addOneAir(100,0);
            }
            else{
                this.addOneAir(arr_pos_air[rand],0);
            }
        }
        else if(choose>=0.75 && choose<1){
            if(engine.score>10 && engine.score<15){
                this.addOneBus(190,0);
                this.addOneOil(100,0);
            }
            else{
                this.addOneOil(arr_pos_oil[rand],0);
            }
        }

        engine.game.world.bringToTop(this.player);
        engine.game.world.bringToTop(this.header);
        engine.game.world.bringToTop(this.bgButton);
        engine.game.world.bringToTop(this.btnLeft);
        engine.game.world.bringToTop(this.btnRight);
    },
    addOneAir: function(x, y){
        var _air = this.air.getFirstDead();
        _air.reset(x,y);
        _air.body.velocity.y = this.leqSpeed-this.countDelay;
        _air.checkWorldBounds = true;
        _air.outOfBoundsKill = true;

        this.air.forEachAlive(function (obj) {
            obj.sendToBack();
        });
        
        this.bus.forEachAlive(function (obj) {
            engine.game.world.bringToTop(obj);
        });

        this.cars.forEachAlive(function (obj) {
            engine.game.world.bringToTop(obj);
        });
    },
    addOneOil: function(x, y) {  
        var _oil = this.oil.getFirstDead();
        _oil.reset(x,y);
        _oil.body.velocity.y = this.leqSpeed-this.countDelay;
        _oil.checkWorldBounds = true;
        _oil.outOfBoundsKill = true;

        this.oil.forEachAlive(function (obj) {
            obj.sendToBack();
        });
        
        this.bus.forEachAlive(function (obj) {
            engine.game.world.bringToTop(obj);
        });

        this.cars.forEachAlive(function (obj) {
            engine.game.world.bringToTop(obj);
        });
    },

    addOneBus: function(x, y) {  
        var _bus = this.bus.getFirstDead();
        _bus.reset(x,y);
        _bus.body.velocity.y = 400;  
        _bus.checkWorldBounds = true;
        _bus.outOfBoundsKill = true;
        
        this.oil.forEachAlive(function (obj) {
            obj.sendToBack();
        });

        this.bus.forEachAlive(function (obj) {
            engine.game.world.bringToTop(obj);
        });

        if(engine.score<this.maxScore){
            engine.score += 1;
            this.progressBar.scale.y = engine.score/this.maxScore;
        }

        if(engine.score == this.maxScore){
            this.gameOver();
        }
    },

    addOneCar: function(x, y) {  
        var car = this.cars.getFirstDead();
        car.reset(x,y);
        car.body.velocity.y = 500;  
        car.checkWorldBounds = true;
        car.outOfBoundsKill = true;

        this.oil.forEachAlive(function (obj) {
            obj.sendToBack();
        });

        this.cars.forEachAlive(function (obj) {
            engine.game.world.bringToTop(obj);
        });
        
        if(engine.score<this.maxScore){
            engine.score += 1;
            this.progressBar.scale.y = engine.score/this.maxScore;
        }

        if(engine.score == this.maxScore){
            this.gameOver();
        }
    },
    reduceVelocityAir: function(){
        this.countDelay = -this.leqDelay;
        this.countVelocity();
    },
    reduceVelocityOil: function(){
        this.countDelay = this.leqDelay;
        this.countVelocity();
    },

    countVelocity: function(){
        var self = this;
        this.oil.forEachAlive(function (obj) {
            obj.body.velocity.y=self.leqSpeed-self.countDelay;
        });

        this.air.forEachAlive(function (obj) {
            obj.body.velocity.y=self.leqSpeed-self.countDelay;
        });
    },
    sendScore: function(){
        var self = this;
        
        // $.ajax({
        //     type: 'POST',
        //     url: engine.options.base_url+"app/api.php",
        //     crossDomain: true,
        //     data: {
        //         type:"public",
        //         act:"save_point",
        //         name:'Play Game Power Five',
        //         point:engine.score,
        //         action:'PlayGame',
        //         url:engine.options.base_url+'games/power_five',
        //         url_http_referrer:engine.options.base_url,
        //         label:'Game',
        //         lead_id:atob(getCookie('xkjtk4'))
        //     },
        //     success: function(responseData, textStatus, jqXHR) {
                engine.game.state.start('finish');
        //     },
        //     error: function (responseData, textStatus, errorThrown) {
        //         engine.game.state.start('finish'); 
        //     }
        // });
    },
    gameOver: function(player, othercars) {
        if(!this.isFinish){
            this.sound.stop();
            this.isFinish = true;
            this.sendScore();
        }
    }
};