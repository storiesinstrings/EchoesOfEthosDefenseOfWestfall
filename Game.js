DefenseOfWestfall.Game = function(game) {
    
   
    this.warPanel;
    this.cavalryButton;
    this.totalCavalry;
    this.cavalryGroup;
    this.knightButton;
    this.knightNumber;
    this.knightGroup;
    this.placingKnight;
    this.archerButton;
    this.archerGroup;
    this.placingArcher;
    this.dwarfButton;
    this.dwarfGroup;
    this.skeletonGroup;
    this.skeletonNumber;
    this.theWall;
    this.gameOver;
    this.gameOverMessage;
    this.explosionClip;
    this.highScoreMessage;
    this.totalSkeletonsKilled = 0;
    this.gameStartingTime;
    
   
};



DefenseOfWestfall.Game.prototype = {
    
    create: function() {
        
        this.gameStartingTime = this.time.now;
        this.gameOver = false;
         // this.cavalryPrompt;
        this.cavalryRate = 6000;
        this.cavalryFire = 0;
        this.dwarfRate = 3000;
        this.dwarfFire = 0;
        this.knightRate = 400;
        this.knightFire = 0;
        this.knightsOnField = 0;
        this.maxKnights = 10;
        this.totalCavalry = 7;
        this.placingKnight = true;
        this.placingArcher = false;
        this.gameOverMessage;
        this.highScoreMessage;
        this.restartGameButton;
        
        this.buildWorld();
        this.knightGroup = this.add.group();
        this.knightGroup.enableBody = true;
        this.physics.enable(this.knightGroup, Phaser.Physics.ARCADE);
        this.knightGroup.setAll('outOfBoundsKill', true);
        this.knightGroup.setAll('checkWorldBounds', true);
        this.archerGroup = this.add.group();
        this.archerGroup.enableBody = true;
        this.wizardFireGroup = this.add.group();
        this.wizardFireGroup.enableBody = true;
        this.wallGroup = this.add.group();
        this.wallGroup.enableBody = true;
        this.skeletonNumber = 7;
        this.shadowKnightNumber = 1;
        this.cavalryGroup = this.add.group();
        this.dwarfGroup = this.add.group();
        this.skeletonGroup = this.add.group();
        this.trollGroup = this.add.group();
        this.shadowKnightGroup = this.add.group();
        this.highSkeletonScoreMessage;
        this.buildSkeletons();
        this.wallHealth = 100;
        this.peopleSaved = 0;
     //   this.cavalryPrompt;
        this.buildKnight();
        this.moreSkeletonRate = 13000;
        this.moreSkeletonFire = 13000;
        this.moreTrollRate = 37000;
        this.moreTrollFire = 20000;
        this.moreShadowRate = 20000;
        this.moreShadowFire = 10000;
        this.wizardOnField = false;
        this.wizardLaunchRate = 150000;
        this.wizardLaunchFire = 0;
        this.wizardFireLaunchRate = 30;
        this.wizardFireLaunchFire = 0;
        this.skeletonsKilled = 0;
        this.explosionPicker = 0;
        this.shadowExplosionPicker = 0;
        this.gameOverBang = false;
        
        
        this.cavalryKeyLaunch = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.dwarfKeyLaunch = this.input.keyboard.addKey(Phaser.Keyboard.D);
        
        this.explosionSound = this.add.audio('explosionSound');
        this.shieldSound = this.add.audio('shieldSound');
        this.horseSound = this.add.audio('horseSound');
        this.music = this.add.audio('gameMusic');
        this.music.play();
        this.music.volume = 0.5;
      //  this.music.onLoop.add(this.playLevelMusic, this);
        this.spellSound = this.add.audio('spellSound');
        this.trollSound = this.add.audio('trollSound');
        this.dwarfSound = this.add.audio('dwarfSound');
        
        this.musicTime = this.time.now + 83500;
        
        
        
    },
    
 /*   playLevelMusic: function(){
        if(this.wallHealth > 1){
            this.music = this.add.audio('gameMusic');
            this.music.play('', 100, 0.3, true);
            this.music.onLoop.add(this.playLevelMusic, this);
        } 
        
    }, */
    
    
    
    buildWorld: function() {
        
        this.add.image(0, 0, 'gameBoard');
        this.buildWall();
        this.buildWarPanel();
        
        this.cavalryPrompt = this.add.bitmapText(20, this.world.centerY+230, 'eightbitwonder', 'Cavalry Preparing...', 18);
        this.dwarfPrompt = this.add.bitmapText(this.world.centerX + 20, this.world.centerY+230, 'eightbitwonder', 'Dwarves Resting', 18);
        this.wallHealthPrompt = this.add.bitmapText(this.world.centerX - 200, this.world.centerY-430, 'eightbitwonder', 'Wall Health ' + this.wallHealth, 25);
        this.peopleSavedPrompt = this.add.bitmapText(this.world.centerX - 200, this.world.centerY-400, 'eightbitwonder', 'Civilians Saved ' + Math.floor(this.peopleSaved), 25);
        this.skeletonsKilledPrompt = this.add.bitmapText(this.world.centerX - 200, this.world.centerY-370, 'eightbitwonder', 'Skeletons Killed ' + this.skeletonsKilled, 20);
        
        
        
    },
    
    buildWall: function() {
        this.theWall = this.add.sprite(0,730,'wall');
       this.physics.enable(this.theWall, Phaser.Physics.ARCADE);
       this.theWall.body.immovable = true;
        
        this.explosionClip = this.add.sprite(50, 50, 'explosionA','explosion01.png');
        this.explosionClip.anchor.setTo(0.5, 0.5);
        this.explosionClip.animations.add('boom', this.game.math.numberArray(1,12));
        this.explosionClip.animations.play('boom', 24, false);
        
        this.explosionClip2 = this.add.sprite(50, 50, 'explosionA','explosion01.png');
        this.explosionClip2.anchor.setTo(0.5, 0.5);
        this.explosionClip2.animations.add('boom', this.game.math.numberArray(1,12));
        this.explosionClip2.animations.play('boom', 24, false);
        
        this.explosionClip3 = this.add.sprite(50, 50, 'explosionA','explosion01.png');
        this.explosionClip3.anchor.setTo(0.5, 0.5);
        this.explosionClip3.animations.add('boom', this.game.math.numberArray(1,12));
        this.explosionClip3.animations.play('boom', 24, false);
        
        this.explosionClip4 = this.add.sprite(50, 50, 'explosionA','explosion01.png');
        this.explosionClip4.anchor.setTo(0.5, 0.5);
        this.explosionClip4.animations.add('boom', this.game.math.numberArray(1,12));
        this.explosionClip4.animations.play('boom', 24, false);
        
        this.explosionClip5 = this.add.sprite(50, 50, 'explosionA','explosion01.png');
        this.explosionClip5.anchor.setTo(0.5, 0.5);
        this.explosionClip5.animations.add('boom', this.game.math.numberArray(1,12));
        this.explosionClip5.animations.play('boom', 24, false);
        
        this.explosionClip6 = this.add.sprite(50, 50, 'explosionA','explosion01.png');
        this.explosionClip6.anchor.setTo(0.5, 0.5);
        this.explosionClip6.animations.add('boom', this.game.math.numberArray(1,12));
        this.explosionClip6.animations.play('boom', 24, false);
        
        
    },
    
    buildWarPanel: function() {
        this.cavalryButton = this.add.button(this.world.centerX - 260, this.world.height-170, 'cavalry', this.buildCavalry, this, 2, 1, 0);
        this.cavalryButton.scale.x *= 1.8;
        this.cavalryButton.scale.y *= 1.8;
        
        
     //   this.knightButton = this.add.button(this.world.centerX - 210, this.world.height-200, 'knightSaluting', this.knightButtonActive, this, 2, 1, 0);
       // this.archerButton = this.add.button(this.world.centerX - 220, this.world.height-100, 'archerFacingSouth', this.archerButtonActive, this, 2, 1, 0);
        this.dwarfButton = this.add.button(this.world.centerX + 100, this.world.height-170, 'dwarfRunningEast', this.dwarfButtonActive, this, 2, 1, 0);
        this.dwarfButton.scale.x *= 2;
        this.dwarfButton.scale.y *= 2;
    },
    dwarfButtonActive: function(){
        this.buildDwarf();
    },
    
    buildCavalry: function() {
        
        if(this.time.now > this.cavalryFire && this.gameOver === false) {
            this.cavalryFire = this.time.now + this.cavalryRate;
            
            this.horseSound.play();
            this.horseSound.volume = 0.4;
          
          //  this.placingKnight = false;
          //  this.placingArcher = false;
            this.physics.enable(this.cavalryGroup, Phaser.Physics.ARCADE);
            for(var i=0; i<this.totalCavalry; i++) {
                var b = this.cavalryGroup.create(this.rnd.integerInRange(-300, this.world.width-700), this.rnd.integerInRange(this.world.height-800, this.world.height-290), 'cavalry', 'slice01_01.png');
                this.physics.enable(b, Phaser.Physics.ARCADE);
                b.enableBody = true;
                b.anchor.setTo(0.5, 0.5);
                b.body.moves = true;
                b.animations.add('Walk', this.game.math.numberArray(1,12));
                b.animations.play('Walk', 24, true);
                b.body.velocity.x = 600;
                //this.assignCavalryMovement(b);   
                b.body.immovable = true;
                b.checkWorldBounds = true;
                b.events.onOutOfBounds.add(this.killCavalry, this);
                
                    
                
                
            }
        }
    },
    killCavalry: function(b){
        if(b.body.x>300){
         //   this.cavalryFire = this.time.now;
            b.kill();
        }
    },
    
    fireOut: function(t){
        t.kill();
    },
    
    
    
    assignCavalryMovement: function(b) {
         t = this.add.tween(b).to({x:300}, 3500, Phaser.Easing.Quadratic.InOut, true, 0);
    },
        
    knightButtonActive: function() {
        this.placingKnight != this.placingKnight;
        this.placingArcher = false;
        this.buildKnight();
    },
    
    buildKnight: function(pointer) {
       
        if(this.placingKnight = true && this.gameOver == false ) {
          this.input.onDown.add(this.placeKnight, this);
            
        }
        
    },
    
    placeKnight: function(pointer) {
        if(pointer.y < 700 && this.placingKnight === true && this.time.now > this.knightFire/* && this.knightsOnField < this.maxKnights*/) {
        this.knightsOnField++;
        this.knightFire = this.time.now + this.knightRate;
        var k = this.knightGroup.create( pointer.x , this.world.height-250, 'knight', 'knightRunningSouth01.png');
        this.physics.enable(k, Phaser.Physics.ARCADE);
        k.enableBody = true;
        k.anchor.setTo(0.5, 0.5);
        k.body.moves = true;
        k.body.width = 50;
        k.animations.add('walk', this.game.math.numberArray(13, 24));
        k.animations.add('run', this.game.math.numberArray(1, 12));
        k.animations.play('walk', 24, true);
            k.checkWorldBounds = true;
            k.events.onOutOfBounds.add(this.knightOut, this);
            k.events.onAnimationLoop.add(this.knightFellBack, this);
            
        
        k.body.velocity.y = -200;

        
      //  this.assignKnightMovement(k, pointer);
        }
    },
    
    assignKnightMovement: function(k, pointer) {
         t = this.add.tween(k).to({y: pointer.y}, 300000 / (pointer.y ), Phaser.Easing.Quadratic.InOut, true, 0);
    },
    
    knightOut: function(k){
        k.kill();
        this.knightsOnField--;
        
    },
    
    knightFellBack:function(k){
        if(k.y > 700){
            k.kill();
        }
    },
 /*   archerButtonActive: function() {
        this.placingKnight = false;
        this.placingArcher != this.placingArcher;
        this.buildArcher();
    },
    
    buildArcher: function(pointer) {
       
        if(this.placingArcher = true) {
          this.input.onDown.add(this.placeArcher, this);
        }
        
    },
    
    placeArcher: function(pointer) {
        if(pointer.y < 820 && pointer.y > 430 && this.placingArcher === true) {
        var a = this.archerGroup.create( pointer.x , pointer.y, 'archer', 'Archer-Attacking-North01.png');
        this.physics.enable(a, Phaser.Physics.ARCADE);
        a.enableBody = true;
        a.anchor.setTo(0.5, 0.5);
        a.body.moves = false;
        a.animations.add('waiting', this.game.math.numberArray(30,38));
        a.animations.play('waiting', 8, true);
        }
    },  */
    
    buildDwarf: function() {
       // this.placingKnight = false;
       // this.placingArcher = false;
         if(this.time.now > this.dwarfFire && this.gameOver === false) {
            this.dwarfFire = this.time.now + this.dwarfRate;
            
             this.dwarfSound.play();
            this.dwarfSound.volume = 0.7;

                var d1 = this.dwarfGroup.create(-100, 700, 'dwarfRunningEast', 'dwarfRunningEast01.png');
                this.physics.enable(d1, Phaser.Physics.ARCADE);
                d1.enableBody = true;
                d1.anchor.setTo(0.5, 0.5);
                d1.body.moves = true;
                d1.animations.add('Walk', this.game.math.numberArray(1,8));
                d1.animations.play('Walk', 15, true);
                d1.body.velocity.x = 400;
                d1.body.ySpeedMax = 0;
               // d1.body.drag.setTo(1000);
                d1.body.immovable = true;
             d1.checkWorldBounds = true;
            d1.events.onOutOfBounds.add(this.d1Out, this);

             //   d1.body.bounce.set = 0;


                var d2 = this.dwarfGroup.create(600, 650, 'dwarfRunningEast', 'dwarfRunningEast01.png');
                this.physics.enable(d2, Phaser.Physics.ARCADE);
                d2.enableBody = true;
                d2.anchor.setTo(0.5, 0.5);
                d2.scale.x *= -1;
                d2.body.moves = true;
                d2.animations.add('Walk', this.game.math.numberArray(1,8));
                d2.animations.play('Walk', 15, true);
                d2.body.velocity.x = -400;
                d2.body.immovable = true;
              d2.checkWorldBounds = true;
            d2.events.onOutOfBounds.add(this.d2Out, this);

         //   this.dwarfGroup.body.ySpeedMax(0);
         }
    },
    
    d1Out: function(d1){
        if(d1.x > 500){
            d1.kill();
        }
        
    },
    
    d2Out: function(d2){
        if(d2.x < -50){
            d2.kill();
        }
    },

    buildSkeletons: function() {
        this.skeletonGroup = this.add.group();
        this.skeletonGroup.health = 5;

      //  this.physics.enable(this.skeletonGroup, Phaser.Physics.ARCADE);
        for(var i = 0; i<this.skeletonNumber; i++) {
            var s = this.skeletonGroup.create(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -290), 'skeleton', 'skeletonAttackSouth01.png');
            this.physics.enable(s, Phaser.Physics.ARCADE);
            s.enableBody = true;
            s.anchor.setTo(0.5, 0.5);
            s.body.moves = true;
            s.health = 25;
            s.animations.add('Walk', this.game.math.numberArray(31,39));
            s.animations.add('fight', this.game.math.numberArray(17,30));
            s.animations.play('Walk', 10, true);
            s.body.velocity.y = this.rnd.integerInRange(50, 200);
  
        }
    },   
    
        skeletonHitWall: function(theWall, skeletonGroup) {
            
            // Make Explosions
            this.explosionClip.kill();
            this.explosionClip = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
        this.explosionClip.anchor.setTo(0.5, 0.5);
        this.explosionClip.animations.add('boom', this.game.math.numberArray(0,18));
        this.explosionClip.animations.play('boom', 24, false);
            
            
            skeletonGroup.reset(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -2900));
            skeletonGroup.body.velocity.y = this.rnd.integerInRange(100, 300);
            skeletonGroup.animations.play('Walk', 24, true);
            this.wallHealth--;
            this.skeletonsKilled++;
            if(this.gameOver == false){
                this.explosionSound.play();
                this.explosionSound.volume = 0.1;
            }
} ,
    dwarfHitSkeleton: function(skeletonGroup, dwarfGroup) {
         //Make Lots of Explosions
        if(this.explosionPicker == 0){
              this.explosionClip4.kill();
            this.explosionClip4 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip4.anchor.setTo(0.5, 0.5);
            this.explosionClip4.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip4.animations.play('boom', 24, false);
            this.explosionPicker = 1;
        } if(this.explosionPicker == 1){
            this.explosionClip5.kill();
            this.explosionClip5 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip5.anchor.setTo(0.5, 0.5);
            this.explosionClip5.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip5.animations.play('boom', 24, false);
            this.explosionPicker = 2;
        } if(this.explosionPicker == 2){
            this.explosionClip6.kill();
            this.explosionClip6 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip6.anchor.setTo(0.5, 0.5);
            this.explosionClip6.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip6.animations.play('boom', 24, false);
            this.explosionPicker = 0;
        }
    //    skeletonGroup.reset(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -2900));
     //   skeletonGroup.body.velocity.y = this.rnd.integerInRange(50, 200);
        skeletonGroup.kill();
        this.skeletonsKilled++;
        this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.05;
    },
    
    cavalryHitSkeleton: function(skeletonGroup, cavalryGroup) {
         //Make Lots of Explosions
        if(this.explosionPicker == 0){
              this.explosionClip4.kill();
            this.explosionClip4 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip4.anchor.setTo(0.5, 0.5);
            this.explosionClip4.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip4.animations.play('boom', 24, false);
            this.explosionPicker = 1;
        } if(this.explosionPicker == 1){
            this.explosionClip5.kill();
            this.explosionClip5 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip5.anchor.setTo(0.5, 0.5);
            this.explosionClip5.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip5.animations.play('boom', 24, false);
            this.explosionPicker = 2;
        } if(this.explosionPicker == 2){
            this.explosionClip6.kill();
            this.explosionClip6 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip6.anchor.setTo(0.5, 0.5);
            this.explosionClip6.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip6.animations.play('boom', 24, false);
            this.explosionPicker = 0;
        }
        skeletonGroup.reset(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -2900));
        skeletonGroup.body.velocity.y = this.rnd.integerInRange(75, 350);
        this.skeletonsKilled++;
        this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.05;
    },
    
    knightHitSkeleton: function(skeletonGroup, knightGroup) {
        //Make Lots of Explosions
        if(this.explosionPicker == 0){
              this.explosionClip4.kill();
            this.explosionClip4 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip4.anchor.setTo(0.5, 0.5);
            this.explosionClip4.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip4.animations.play('boom', 24, false);
            this.explosionPicker = 1;
        } if(this.explosionPicker == 1){
            this.explosionClip5.kill();
            this.explosionClip5 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip5.anchor.setTo(0.5, 0.5);
            this.explosionClip5.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip5.animations.play('boom', 24, false);
            this.explosionPicker = 2;
        } if(this.explosionPicker == 2){
            this.explosionClip6.kill();
            this.explosionClip6 = this.add.sprite(skeletonGroup.x, skeletonGroup.y, 'explosionA','explosion01.png');
            this.explosionClip6.anchor.setTo(0.5, 0.5);
            this.explosionClip6.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip6.animations.play('boom', 24, false);
            this.explosionPicker = 0;
        }

        skeletonGroup.reset(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -2900));
        skeletonGroup.body.velocity.y = this.rnd.integerInRange(100, 200);
       // knightGroup.kill();
      //  skeletonGroup.damage(25);
        knightGroup.body.velocity.y = 70;
        this.knightsOnField--;
        this.skeletonsKilled++;
      //  knightGroup.animations.play('fight', 24, true);
       //  skeletonGroup.animations.play('fight', 10, true);
        
        this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.1;
    },
    
    trollHitWall: function(theWall, trollGroup) {
        
        
        // Make Explosions
        
            this.explosionClip2.kill();
            this.explosionClip2 = this.add.sprite(trollGroup.x, trollGroup.y, 'explosionA','explosion01.png');
        this.explosionClip2.anchor.setTo(0.5, 0.5);
        this.explosionClip2.animations.add('boom', this.game.math.numberArray(0,19));
        this.explosionClip2.animations.play('boom', 24, false);
        this.explosionClip2.scale.x *=2;
        this.explosionClip2.scale.y *=2;
        
        if(this.gameOver == false){
        this.explosionSound.play();
        this.explosionSound.volume = 0.3;
            this.trollSound.play();
        this.trollSound.volume = 0.4;
        }
            trollGroup.reset(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -500));
           trollGroup.body.velocity.y = this.rnd.integerInRange(20, 24);
            
            trollGroup.health = 100;
            this.wallHealth -= 10;
        this.skeletonsKilled++;
           // this.skeletonsKilled++;
} ,
    dwarfHitTroll: function(trollGroup, dwarfGroup) {
        
        // Make Explosions
            this.explosionClip2.kill();
            this.explosionClip2 = this.add.sprite(trollGroup.x, trollGroup.y, 'explosionA','explosion01.png');
        this.explosionClip2.anchor.setTo(0.5, 0.5);
        this.explosionClip2.animations.add('boom', this.game.math.numberArray(0,18));
        this.explosionClip2.animations.play('boom', 24, false);
        this.explosionClip2.scale.x *=2;
        this.explosionClip2.scale.y *=2;
        this.skeletonsKilled++;
        trollGroup.damage(50);
        this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.1;
        
    },
    
    cavalryHitTroll: function(trollGroup, cavalryGroup) {
        
         // Make Explosions
            this.explosionClip2.kill();
            this.explosionClip2 = this.add.sprite(trollGroup.x, trollGroup.y, 'explosionA','explosion01.png');
        this.explosionClip2.anchor.setTo(0.5, 0.5);
        this.explosionClip2.animations.add('boom', this.game.math.numberArray(0,18));
        this.explosionClip2.animations.play('boom', 24, false);
        this.explosionClip2.scale.x *=2;
        this.explosionClip2.scale.y *=2;
        this.skeletonsKilled++;
        trollGroup.damage(10);
        trollGroup.body.velocity.x = 0;
        this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.1;
    },
    
    knightHitTroll: function(trollGroup, knightGroup) {
        
         // Make Explosions
            this.explosionClip2.kill();
            this.explosionClip2 = this.add.sprite(trollGroup.x, trollGroup.y, 'explosionA','explosion01.png');
        this.explosionClip2.anchor.setTo(0.5, 0.5);
        this.explosionClip2.animations.add('boom', this.game.math.numberArray(0,18));
        this.explosionClip2.animations.play('boom', 24, false);
        this.explosionClip2.scale.x *=2;
        this.explosionClip2.scale.y *=2;
        
        trollGroup.damage(10);
        knightGroup.body.velocity.y = 300;
        knightGroup.animations.play('run', 24, true);
         this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.1;
        
    },
    
        shadowKnightHitWall: function(theWall, shadowKnightGroup) {
            
            // Make Explosions
        if(this.shadowExplosionPicker == 0){
            this.explosionClip3.kill();
            this.explosionClip3 = this.add.sprite(shadowKnightGroup.x, shadowKnightGroup.y, 'explosionA','explosion01.png');
            this.explosionClip3.anchor.setTo(0.5, 0.5);
            this.explosionClip3.animations.add('boom', this.game.math.numberArray(0,18));
            this.explosionClip3.animations.play('boom', 24, false);
        }
            this.shadowExplosionPicker++;
            
            if(this.shadowExplosionPicker > 20){
                this.shadowExplosionPicker = 0;
            }
            
        if(this.gameOver == false){
          // this.explosionSound.play();
          //  this.explosionSound.volume = 0.01;
        }
       //     shadowKnightGroup.reset(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -500));
       //    shadowKnightGroup.body.velocity.y = this.rnd.integerInRange(20, 100);
         //   shadowKnightGroup.kill();
         //   shadowKnightGroup.health = 20;
            this.wallHealth -= 0.03;
            shadowKnightGroup.damage(0.1);
           // this.skeletonsKilled++;
} ,
    dwarfHitShadowKnight: function(shadowKnightGroup, dwarfGroup) {
        
         // Make Explosions
            this.explosionClip3.kill();
            this.explosionClip3 = this.add.sprite(shadowKnightGroup.x, shadowKnightGroup.y, 'explosionA','explosion01.png');
        this.explosionClip3.anchor.setTo(0.5, 0.5);
        this.explosionClip3.animations.add('boom', this.game.math.numberArray(0,18));
        this.explosionClip3.animations.play('boom', 24, false);
        
        shadowKnightGroup.damage(50);
        this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.05;
    },
    
    cavalryHitShadowKnight: function(shadowKnightGroup, cavalryGroup) {
        
         // Make Explosions
            this.explosionClip3.kill();
            this.explosionClip3 = this.add.sprite(shadowKnightGroup.x, shadowKnightGroup.y, 'explosionA','explosion01.png');
        this.explosionClip3.anchor.setTo(0.5, 0.5);
        this.explosionClip3.animations.add('boom', this.game.math.numberArray(0,18));
        this.explosionClip3.animations.play('boom', 24, false);
        
        shadowKnightGroup.damage(10);
        shadowKnightGroup.body.velocity.x = 0;
        this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.05;
    },
    
    knightHitShadowKnight: function(shadowKnightGroup, knightGroup) {
        
         // Make Explosions
            this.explosionClip3.kill();
            this.explosionClip3 = this.add.sprite(shadowKnightGroup.x, shadowKnightGroup.y, 'explosionA','explosion01.png');
        this.explosionClip3.anchor.setTo(0.5, 0.5);
        this.explosionClip3.animations.add('boom', this.game.math.numberArray(0,18));
        this.explosionClip3.animations.play('boom', 24, false);
        
        shadowKnightGroup.damage(5);
        knightGroup.body.velocity.y = 150;
         this.shieldSound.play();
        this.shieldSound.volume = 0.2;
        this.explosionSound.play();
        this.explosionSound.volume = 0.05;
        
    },
    
    knightHitWall: function(theWall, knightGroup) {
            knightGroup.kill();
    } ,
    
    trollHitFire: function(wizardFireGroup, trollGroup) {
        wizardFireGroup.kill();
        trollGroup.kill();
        this.explosionSound.play();
        this.explosionSound.volume = 0.2;
        this.skeletonsKilled++;
    },
    
    skeletonHitFire: function(wizardFireGroup, skeletonGroup) {
        wizardFireGroup.kill();
        skeletonGroup.kill();
        this.explosionSound.play();
        this.explosionSound.volume = 0.1;
        this.skeletonsKilled++;
    },
    
    shadowKnightHitFire: function(wizardFireGroup, shadowKnightGroup) {
        wizardFireGroup.kill();
        shadowKnightGroup.kill();
        this.explosionSound.play();
        this.explosionSound.volume = 0.1;
        this.skeletonsKilled++;
    },

    
    signsUp: function(){
        if(this.time.now > this.cavalryFire){
            this.cavalryPrompt.text = "Cavalry Ready";
        } else {
            
            this.cavalryPrompt.text = "";
        }
       if(this.time.now > this.dwarfFire) {
          this.dwarfPrompt.text = "Dwarves Ready";
        } else {
            
            this.dwarfPrompt.text = "";
        }
        this.wallHealthPrompt.text = "Wall Health " + Math.floor(this.wallHealth);
        this.peopleSavedPrompt.text = "Civilians Saved " + Math.floor(this.peopleSaved);
        this.skeletonsKilledPrompt.text = "skeletons killed " + this.skeletonsKilled;
        
        if(this.wallHealth >= 1){
            //this.peopleSaved += 0.05;
            this.peopleSaved = (this.time.now - this.gameStartingTime) /650;
            this.totalSkeletonsKilled = this.skeletonsKilled;
        }
        
// !!!!! GAme OVER !!!!!!      
        
         if(this.wallHealth < 1){
            // this.knightButton.destroy();
             this.cavalryButton.destroy();
             this.dwarfButton.destroy();
             this.dwarfPrompt.destroy();
             this.cavalryPrompt.destroy();
             

             this.theWall.kill();
            this.placingKnight = false;
            this.gameOver = true;
             
             this.wallHealthPrompt.text = "";
        this.peopleSavedPrompt.text = "";
        this.skeletonsKilledPrompt.text = "";
             
            this.gameOverMessage = this.add.bitmapText(this.world.centerX - 230, this.world.centerY - 420, 'eightbitwonder', 'The wall\n\n' + 'has fallen!', 50);
            this.gameOverMessage.align = "center";
             this.gameOverMessage.inputEnabled = true;
             this.gameOverMessage.events.onInputDown.addOnce(this.quitGame, this);
             
             this.highScoreMessage = this.add.bitmapText(this.world.centerX - 150, this.world.centerY - 130, 'eightbitwonder', 'Civilians \n\n' + "Saved \n\n" + Math.floor(this.peopleSaved), 40);
            this.highScoreMessage.align = "center";
             this.highScoreMessage.inputEnabled = true;
             this.highScoreMessage.events.onInputDown.addOnce(this.quitGame, this);
             
             this.highSkeletonScoreMessage = this.add.bitmapText(this.world.centerX - 187, this.world.centerY + 120, 'eightbitwonder', 'Skeletons \n\n' + 'killed \n\n' + this.totalSkeletonsKilled, 40);
            this.highSkeletonScoreMessage.align = "center";
             this.highSkeletonScoreMessage.inputEnabled = true;
             this.highSkeletonScoreMessage.events.onInputDown.addOnce(this.quitGame, this);
             
             this.playAgainMessage = this.add.bitmapText(this.world.centerX - 245, this.world.height - 70, 'eightbitwonder', 'Click to play again', 30);
            this.playAgainMessage.align = "center";
             this.playAgainMessage.inputEnabled = true;
             this.playAgainMessage.events.onInputDown.addOnce(this.quitGame, this);
             
// !!!!! Play Bang and Make Fire !!!!!!
             if(this.gameOverBang == false){
                 this.explosionSound.play();
                 this.explosionSound.volume = 0.6;
                 this.gameOverBang = true;
                 
                for(var i = 0; i < 50; i++){
                     var boom = this.add.sprite(this.rnd.integerInRange(0, this.world.width), this.rnd.integerInRange(750, 960), 'explosionA','explosion01.png');
                     boom.anchor.setTo(0.5, 0.5);
                     boom.animations.add('boom', this.game.math.numberArray(1,12));
                     boom.animations.play('boom', this.rnd.integerInRange(10, 30), true);
                    boom.scale.x *= 1.5;
                    boom.scale.y *= 1.5;
                    
                 }

             }
             

        }
        
    },
    
    quitGame: function(pointer){
        this.music.stop();
        this.state.start('StartMenu');
    },
    


    
    update: function() {
        
        this.physics.arcade.collide(this.skeletonGroup, this.theWall, this.skeletonHitWall, null, this);
        this.physics.arcade.collide(this.skeletonGroup, this.dwarfGroup, this.dwarfHitSkeleton, null, this);
        this.physics.arcade.collide(this.skeletonGroup, this.cavalryGroup, this.cavalryHitSkeleton, null, this);
        this.physics.arcade.collide(this.skeletonGroup, this.knightGroup, this.knightHitSkeleton, null, this);
        this.physics.arcade.collide(this.trollGroup, this.theWall, this.trollHitWall, null, this);
        this.physics.arcade.collide(this.trollGroup, this.dwarfGroup, this.dwarfHitTroll, null, this);
        this.physics.arcade.collide(this.trollGroup, this.cavalryGroup, this.cavalryHitTroll, null, this);
        this.physics.arcade.collide(this.trollGroup, this.knightGroup, this.knightHitTroll, null, this);
        this.physics.arcade.collide(this.shadowKnightGroup, this.theWall, this.shadowKnightHitWall, null, this);
        this.physics.arcade.collide(this.shadowKnightGroup, this.dwarfGroup, this.dwarfHitShadowKnight, null, this);
        this.physics.arcade.collide(this.shadowKnightGroup, this.cavalryGroup, this.cavalryHitShadowKnight, null, this);
        this.physics.arcade.collide(this.shadowKnightGroup, this.knightGroup, this.knightHitShadowKnight, null, this);  
        
        this.physics.arcade.collide(this.skeletonGroup, this.wizardFireGroup, this.skeletonHitFire, null, this);
        this.physics.arcade.collide(this.trollGroup, this.wizardFireGroup, this.trollHitFire, null, this);
        this.physics.arcade.collide(this.shadowKnightGroup, this.wizardFireGroup, this.shadowKnightHitFire, null, this);
        
        this.physics.arcade.collide(this.knightGroup, this.theWall, this.knightHitWall, null, this);
     
        this.signsUp();
        
       // if(this.music.isPlaying == false){    this.music.play(); this.music.volume = 0.3;  } 
     /*   this.music.onStop.addOnce(function() {
 
        this.music.play();
 
            }, this); */
        
        if(this.time.now > this.moreSkeletonFire){
            this.moreSkeletonFire = this.time.now + this.moreSkeletonRate;
            this.moreSkeletonRate -= 100;
                for(var i = 0; i<1; i++) {
                var s = this.skeletonGroup.create(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -290), 'skeleton', 'skeletonAttackSouth01.png');
                this.physics.enable(s, Phaser.Physics.ARCADE);
                s.enableBody = true;
                s.anchor.setTo(0.5, 0.5);
                s.body.moves = true;
                s.animations.add('Walk', this.game.math.numberArray(31,39));
                s.animations.add('fight', this.game.math.numberArray(17,30));
                s.animations.play('Walk', 10, true);
                s.body.velocity.y = this.rnd.integerInRange(50, 200);   
                }

        }
        
        if(this.time.now > this.moreTrollFire){
            this.moreTrollFire = this.time.now + this.moreTrollRate;
            this.moreTrollRate -= 75;
            this.trollSound.play();
            this.trollSound.volume = 0.4;
             var t = this.trollGroup.create(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -290), 'troll', 'Troll-Attack-South01.png');
        this.physics.enable(t, Phaser.Physics.ARCADE);
            t.enableBody = true;
            t.anchor.setTo(0.5, 0.5);
            t.body.moves = true;
            t.body.gravity.y = 200;
            t.health = 100;
            t.scale.x *= 2;
            t.scale.y *= 2;
            t.animations.add('Walk', this.game.math.numberArray(25,33));
            t.animations.add('fight', this.game.math.numberArray(17,30));
            t.animations.play('Walk', 10, true);
            t.body.velocity.y = this.rnd.integerInRange(20, 30);
            t.body.drag.setTo(0);
            
            var s = this.skeletonGroup.create(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -290), 'skeleton', 'skeletonAttackSouth01.png');
                this.physics.enable(s, Phaser.Physics.ARCADE);
                s.enableBody = true;
                s.anchor.setTo(0.5, 0.5);
                s.body.moves = true;
                s.animations.add('Walk', this.game.math.numberArray(31,39));
                s.animations.add('fight', this.game.math.numberArray(17,30));
                s.animations.play('Walk', 10, true);
                s.body.velocity.y = this.rnd.integerInRange(50, 200);
        }
        
         if(this.time.now > this.moreShadowFire){
            this.moreShadowFire = this.time.now + this.moreShadowRate;
              for(var i = 0; i<this.shadowKnightNumber; i++) {
                var sK = this.shadowKnightGroup.create(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -290), 'shadowKnight', 'shadowknight01.png');
                this.physics.enable(sK, Phaser.Physics.ARCADE);
                sK.enableBody = true;
                sK.anchor.setTo(0.5, 0.5);
                sK.body.moves = true;
                sK.health = 20; 
                 sK.body.gravity.y = 100;
                sK.animations.add('Walk', this.game.math.numberArray(1,9));
                 sK.animations.play('Walk', 10, true);
                 sK.body.velocity.y = this.rnd.integerInRange(100, 200);
                  sK.scale.x *= 1.2;
            sK.scale.y *= 1.2;
  
             }
              var s = this.skeletonGroup.create(this.rnd.integerInRange(10, this.world.width-10), this.rnd.integerInRange(-50, -290), 'skeleton', 'skeletonAttackSouth01.png');
                this.physics.enable(s, Phaser.Physics.ARCADE);
                s.enableBody = true;
                s.anchor.setTo(0.5, 0.5);
                s.body.moves = true;
                s.animations.add('Walk', this.game.math.numberArray(31,39));
                s.animations.add('fight', this.game.math.numberArray(17,30));
                s.animations.play('Walk', 10, true);
                s.body.velocity.y = this.rnd.integerInRange(50, 200);  
         }
        
        if(this.gameOver == false){
            if(this.time.now > this.wizardLaunchFire){
                this.wizardLaunchFire = this.time.now + this.wizardLaunchRate;
                this.wizardKillTime = this.time.now + 6000;
                this.spellSound.play();
                this.spellSound.volume = 0.4;
                this.wizardMan = this.add.sprite(this.world.centerX + 20, 890, 'wizard','wizard01');
            this.wizardMan.anchor.setTo(0.5, 0.5);
                this.wizardMan.scale.x *= 2;
                this.wizardMan.scale.y *= 2;
            this.wizardMan.animations.add('spelling', this.game.math.numberArray(1,12));
            this.wizardMan.animations.play('spelling', 24, true);
                for(var k = 0; k < 20; k++){
                    var t = this.wizardFireGroup.create(this.world.centerX + 20, 885, 'explosionA', 'explosion01.png');
                this.physics.enable(t, Phaser.Physics.ARCADE);
                    t.enableBody = true;
                    t.anchor.setTo(0.5, 0.5);
                    t.body.moves = true;
                    t.animations.add('fire', this.game.math.numberArray(1,16));
                    t.animations.play('fire', this.rnd.integerInRange(5, 15), true);
                    t.body.velocity.y = this.rnd.integerInRange(-90, -200);
                    t.body.velocity.x = this.rnd.integerInRange(-100, 100);
                    t.checkWorldBounds = true;
                    t.events.onOutOfBounds.add(this.fireOut, this);
                
                }
            }

        }
        
            if(this.time.now > this.wizardKillTime){
                this.wizardMan.kill();

            
        }
               
        if (this.cavalryKeyLaunch.isDown)
        {
            this.buildCavalry();
        }
        
        if (this.dwarfKeyLaunch.isDown)
        {
            this.buildDwarf();
        }

        if(this.time.now > this.musicTime) {
            this.music.play();
            this.musicTime = this.time.now + 83500;
        }
        
    }   
   
};