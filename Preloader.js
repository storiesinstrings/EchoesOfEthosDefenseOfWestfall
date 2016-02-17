DefenseOfWestfall.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

DefenseOfWestfall.Preloader.prototype = {
	
	preload: function () {
        this.titleText = this.add.image(this.world.centerX, this.world.centerY, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);
		this.preloadBar = this.add.sprite(this.world.centerX - 230, this.world.centerY + 230, 'preloaderBar');
		//this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		
        this.load.image('titlescreen', 'images/startScene.png');
        this.load.image('infoPic', 'images/infoPic.png');
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        this.load.image('gameBoard', 'images/gameBoard.png');
        this.load.image('wall', 'images/wall.png');
        this.load.image('arrow', 'images/arrow-going-north.png');
        this.load.atlasXML('cavalry', 'images/spritesheets/cavalry.png', 'images/spritesheets/cavalry.xml');
        this.load.atlasXML('knightSaluting', 'images/spritesheets/knightSaluting.png', 'images/spritesheets/knightSaluting.xml');
        this.load.atlasXML('knight', 'images/spritesheets/knight.png', 'images/spritesheets/knight.xml');
       // this.load.atlasXML('archerFacingSouth', 'images/spritesheets/archerStandingSouth.png', 'images/spritesheets/archerStandingSouth.xml');
        //this.load.atlasXML('archer', 'images/spritesheets/archer.png', 'images/spritesheets/archer.xml');
        this.load.atlasXML('dwarfRunningEast', 'images/spritesheets/dwarfRunningEast.png', 'images/spritesheets/dwarfRunningEast.xml');
        this.load.atlasXML('skeleton', 'images/spritesheets/skeleton.png', 'images/spritesheets/skeleton.xml');
        this.load.atlasXML('troll', 'images/spritesheets/troll.png', 'images/spritesheets/troll.xml');
        this.load.atlasXML('explosionA', 'images/spritesheets/explosionA.png', 'images/spritesheets/explosionA.xml');
        this.load.atlasXML('shadowKnight', 'images/spritesheets/shadowknight.png', 'images/spritesheets/shadowknight.xml');
        this.load.atlasXML('wizard', 'images/spritesheets/wizard.png', 'images/spritesheets/wizard.xml');
        
        this.load.audio('explosionSound', 'audio/explosion.mp3');
        this.load.audio('shieldSound', 'audio/shield.mp3');
        this.load.audio('horseSound', 'audio/horse.mp3');
        this.load.audio('spellSound', 'audio/spellSound.mp3');
        this.load.audio('trollSound', 'audio/troll.mp3');
        this.load.audio('dwarfSound', 'audio/dwarf.mp3');
        this.load.audio('gameMusic', 'audio/gameMusic1.mp3');
	},

	create: function () {
		
	},

	update: function () {
        if(this.cache.isSoundDecoded('gameMusic') && this.ready == false){
            this.preloadBar.cropEnabled = false;
            this.ready = true;
            this.state.start('StartMenu');
        }
        
	}
};