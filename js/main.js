/**
 * Created by leonard on 7-5-17.
 */

_ = undefined;

var Mexico = Mexico || {

        meta: {
            version: '0.1',
            dev: 'Polydus',
            debug: false
        },

        res: {
            width: 800,
            height: 450
        },

        device: {
            isDesktop: false,
            fullScreenLocked: false
        },

        state: {
            intro: 0,
            game: 1,
            end: 2,
            current: -1
        },

        font: {
            small : {font: "16px FixedsysExcelsior301Regular", fill: "#ffffff"},
            med : {font: "32px FixedsysExcelsior301Regular", fill: "#ffffff"},
            large : {font: "48px FixedsysExcelsior301Regular", fill: "#ffffff"},
            xLarge : {font: "64px FixedsysExcelsior301Regular", fill: "#ffffff"},
            aleMed : {font: "32px FixedsysExcelsior301Regular", fill: "#ffc107"},
            aleLarge : {font: "48px FixedsysExcelsior301Regular", fill: "#ffc107"},
            aleXlarge : {font: "64px FixedsysExcelsior301Regular", fill: "#ffc107"}

        },

        quotes: {
            onKill : [
                'Set sail!', 'Drink their beer!', 'Weiben und Wein!',
                'Shipwrecked your destiny!', 'Let\'s go to Mexico!' ,
                'Get drunk or die!', 'Yo ho Mexico!', 'Hoist the flag!',
                'One more drink!', 'Give me more rum!', 'Rum rum ahoy!',
                'Walk the plank!', 'Get drunk or die!', 'Pirates are all we can be!',
                'Jolly Rogers go!', 'Steal their gold!', 'Buckfast Powersmash!',
                'Swashbucklers \'til we die!', 'your end is nigh!',
                'Set the course for Magnetic North!', 'I\'m on a ship!',
                'Time for a drink!', 'You\'ll cease to be!'

            ]
        }

    };

Mexico.init = function(context){
    this.root = context;
    this.phaser = new Phaser.Game(
        Mexico.res.width, Mexico.res.height, Phaser.AUTO, 'container',
        {
            preload: Mexico.preload,
            create: Mexico.create,
            update: Mexico.update,
            render: Mexico.render
        }
    );
    //this.phaser.preserveDrawingBuffer = true;
};

Mexico.preload = function(){
    Mexico.phaser.add.text(0, 0, "hack", {font:"1px FixedsysExcelsior301Regular", fill:"#FFFFFF"});

    Mexico.device.isDesktop = Mexico.phaser.device.desktop;
    //Mexico.device.isDesktop = false;
    
    var path = 'img/';
    
    /*if(!Mexico.meta.debug){
        path = '/public/img/ale/';
    } else {
        path = '/public/img/mexico/';
    }*/

    if(!Mexico.device.isDesktop){
        Mexico.phaser.load.image('texture/mobile_splash', path + 'mobile_splash.png');
        Mexico.phaser.load.spritesheet('texture/button_up', path + 'button_up.png', 64, 64);
        Mexico.phaser.load.spritesheet('texture/button_down', path + 'button_down.png', 64, 64);
        Mexico.phaser.load.spritesheet('texture/button_left', path + 'button_left.png', 64, 64);
        Mexico.phaser.load.spritesheet('texture/button_right', path + 'button_right.png', 64, 64);
        Mexico.phaser.load.spritesheet('texture/button_fire', path + 'button_fire.png', 128, 128);
    } else {
        Mexico.phaser.load.spritesheet('texture/button_fullscreen', path + 'button_fullscreen.png', 64, 64);
    }

    Mexico.phaser.load.spritesheet('texture/button_close', path + 'button_close.png', 64, 64);
    Mexico.phaser.load.spritesheet('texture/button_play', path + 'button_play.png', 192, 128);


    Mexico.phaser.load.image('texture/player_cannonball', path + 'player_cannonball.png');
    Mexico.phaser.load.image('texture/bg_sea', path + 'bg_sea.png');

    Mexico.phaser.load.spritesheet('texture/water_splash', path + 'water_splash.png', 120, 120);
    Mexico.phaser.load.spritesheet('texture/enemy_ship', path + 'enemy_ship.png', 136, 136);
    Mexico.phaser.load.spritesheet('texture/player_ship', path + 'player_ship.png', 136, 136);
    Mexico.phaser.load.spritesheet('texture/tile_water', path + 'tile_water.png', 48, 48);
    Mexico.phaser.load.spritesheet('texture/item_beer', path + 'item_beer.png', 48, 48);

    Mexico.phaser.add.text(0, 0, "hack", {font:"1px FixedsysExcelsior301Regular", fill:"#FFFFFF"});
};

Mexico.create  = function(){
    Mexico.phaser.onPause.add(Mexico.onPause);
    Mexico.phaser.onResume.add(Mexico.onResume);
    Mexico.phaser.time.advancedTiming = Mexico.meta.debug;
    //Mexico.phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    if(!Mexico.device.isDesktop){
        //Mexico.phaser.scale.setMinMax(400, 225, Mexico.res.width, Mexico.res.height);
       // Mexico.phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //Mexico.phaser.scale.forceLandscape = true;
    }
    Mexico.phaser.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    //Mexico.phaser.scale.refresh();
    //Mexico.phaser.scaleMode = Phaser.ScaleManager.USER_SCALE;
    //Mexico.phaser.scaleFactor = new Phaser.Point(2, 2);


    //Mexico.device.isDesktop = Mexico.phaser.device.desktop;
    //Mexico.device.isDesktop = false;

    if(!Mexico.device.isDesktop){
        Mexico.device.fullScreenLocked = true;
    }

    Mexico.input = new Mexico.Input();
    Mexico.renderer = new Mexico.Renderer();
    Mexico.ui = new Mexico.UI();
    Mexico.game = new Mexico.Game();
    Mexico.statistics = new Mexico.Statistics();

    Mexico.input.init();
    Mexico.renderer.init();
    Mexico.ui.init();
    Mexico.game.init();
    Mexico.statistics.init();

    Mexico.onChangeState(Mexico.state.intro);
   // Mexico.phaser.updateRender(100);
    //console.log(Mexico.phaser);
    //Mexico.phaser.scale.refresh();
};

Mexico.update = function(){
    if(!Mexico.device.fullScreenLocked){
        Mexico.input.update();
        Mexico.game.update();
        Mexico.ui.update();
        Mexico.renderer.update();
        Mexico.statistics.update();

        Mexico.update.counter++;
        if(Mexico.update.counter >= 60){
            Mexico.update.counter = 0;
            Mexico.input.tick();
            Mexico.game.tick();
            Mexico.ui.tick();
            Mexico.renderer.tick();
            Mexico.statistics.tick();
        }
    } else {
        //Mexico.ui.update();
        //Mexico.renderer.update();
    }
};

Mexico.update.counter = 0;

Mexico.render = function(){

};

Mexico.onPause = function(){
    console.log('onPause');
};

Mexico.onResume = function(){
    console.log('onResume');
    /*if(!Mexico.device.isDesktop && !Mexico.game.phaser.scale.isFullScreen){
        Mexico.device.fullScreenLocked = true;
        if(!Mexico.ui.splashScreen.element.visible){
            this.addView(this.splashScreen);
        }
    }*/
};

Mexico.onChangeState = function(state){
    if(state === Mexico.state.current){
        return;
    }

    Mexico.ui.onStateChange(state);
    Mexico.game.onStateChange(state);

    /*
    if(Mexico.state.current === Mexico.state.intro){

    } else if (Mexico.state.current === Mexico.state.game){

    } else if (Mexico.state.current === Mexico.state.end){

    }


    if(state === Mexico.state.intro){

    } else if (state === Mexico.state.game){

    } else if (state === Mexico.state.end){

    }*/


    Mexico.state.current = state;
};

/*
 * INPUT
 */

Mexico.Input = function(){

};


Mexico.Input.prototype = {
    init: function(){
        if(Mexico.device.isDesktop){
            this.cursors = Mexico.phaser.input.keyboard.createCursorKeys();
        }

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.fire = false;
    },

    update: function(){
        if(Mexico.device.isDesktop){
            this.up = (this.cursors.up.isDown || Mexico.phaser.input.keyboard.isDown(Phaser.Keyboard.W));
            this.down = (this.cursors.down.isDown || Mexico.phaser.input.keyboard.isDown(Phaser.Keyboard.S));
            this.left = (this.cursors.left.isDown || Mexico.phaser.input.keyboard.isDown(Phaser.Keyboard.A));
            this.right = (this.cursors.right.isDown || Mexico.phaser.input.keyboard.isDown(Phaser.Keyboard.D));
            this.fire = (Mexico.phaser.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || Mexico.phaser.input.keyboard.isDown(Phaser.Keyboard.ENTER));

            if(Mexico.phaser.input.keyboard.event !== null){
                if(Mexico.phaser.input.keyboard.event.keyCode === Phaser.Keyboard.P
                    && Mexico.phaser.input.keyboard.event.type === 'keyup'){

                    if(Mexico.game.paused){
                        Mexico.game.unPause();
                    } else {
                        Mexico.game.pause();
                    }

                }
                Mexico.phaser.input.keyboard.event = null;
            }
        }


    },

    tick: function(){

    }

};

/*
* RENDERER
*/

Mexico.Renderer = function(){

};

Mexico.Renderer.prototype = {

    BACKGROUND_GROUP: 0,
    GAME_OBJECT_GROUP: 1,
    UI_GROUP: 2,
    UI_GROUP_SUPER: 3,

    init: function(){
        this.groups = [];
        for(var i = 0; i < 4; i++){
            this.groups.push(Mexico.phaser.add.group());
        }
    },

    update: function(){
    },

    tick: function(){

    }
};

/*
 * UI
 */

Mexico.UI = function(){

};


Mexico.UI.prototype = {

    init: function(){
        this.views = [];


        if(Mexico.meta.debug){
            this.debugString = new Mexico.Text(16, 16, "", Mexico.font.small, Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
            this.debugString.tick = function(){
                this.setText(
                    'FPS: ' + Mexico.phaser.time.fps + ' fps\n'
                    + 'Mouse: [' + Math.round(Mexico.phaser.input.mousePointer.x) + ', ' + Math.round(Mexico.phaser.input.mousePointer.y) + ']\n'
                    + 'Seconds played: ' + Mexico.statistics.secondsPlayed + 's\n'

                );
                this.setPos(16, Mexico.res.height - this.bounds.height + 10);
            };



            this.addView(this.debugString);
        }



        this.exitButton = new Mexico.Button(Mexico.phaser.width - 64 - 4, 4,
            "button_close", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);

        this.exitButton.setButtonCallback(function(){
            if(Mexico.phaser.scale.isFullScreen){
                Mexico.phaser.scale.stopFullScreen();
                if(!Mexico.device.isDesktop){
                    Mexico.device.fullScreenLocked = true;
                    Mexico.phaser.scale.setMinMax(400, 225, Mexico.res.width, Mexico.res.height);
                   // Mexico.phaser.scale.refresh();

                    this.addView(this.splashScreen);
                } else {
                    this.removeAndHideView(this.exitButton);
                    this.addView(this.fullScreenButton);
                }
            }
        }, this);
        this.removeAndHideView(this.exitButton);


        if(!Mexico.device.isDesktop){
            this.splashScreen = new Mexico.Button(0, 0,
                "mobile_splash", Mexico.renderer.groups[Mexico.renderer.UI_GROUP_SUPER]);
            this.splashScreen.setButtonCallback(function(){
                Mexico.phaser.scale.startFullScreen();
                //Mexico.phaser.scale.setMinMax(400, 225, Mexico.res.width, Mexico.res.height);
                Mexico.phaser.scale.setMinMax(null, null, null, null);
                //Mexico.phaser.scale.refresh();

                Mexico.ui.removeAndHideView(Mexico.ui.splashScreen);
                Mexico.device.fullScreenLocked = false;
                this.addView(this.exitButton);
            }, this);

            this.addView(this.splashScreen);
        } else {
            this.fullScreenButton = new Mexico.Button(Mexico.phaser.width - 64 - 4, 4,
                "button_fullscreen", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
            this.addView(this.fullScreenButton);


            this.fullScreenButton.setButtonCallback(function(){
                if(Mexico.phaser.scale.isFullScreen){
                    Mexico.phaser.scale.stopFullScreen();
                    if(!Mexico.device.isDesktop){
                        Mexico.device.fullScreenLocked = true;
                        this.addView(this.splashScreen);
                    }
                } else {
                    Mexico.phaser.scale.startFullScreen();
                    this.removeAndHideView(this.fullScreenButton);
                    this.addView(this.exitButton);
                }
            }, this);
        }


        this.devText = new Mexico.Text(0, 0,
            "Polydus.com ", Mexico.font.aleMed, Mexico.renderer.groups[Mexico.renderer.UI_GROUP_SUPER]);
        this.devText.setCenterScreen();
        this.devText.setY(
            //  Mexico.res.width - this.devText.bounds.width + 6,
            Mexico.res.height - this.devText.bounds.height
        );
        this.addView(this.devText);

        //this.views.
    },


    onStateChange: function(state){
        if(Mexico.state.current === Mexico.state.intro){
            this.removeAndHideView(this.introText);
            this.removeAndHideView(this.playButton);
            this.removeAndHideView(this.playButtonText);
            this.removeAndHideView(this.headerText);

            clearInterval(this.playButtonText.blinkInterval);

        } else if (Mexico.state.current === Mexico.state.game){
            this.removeAndHideView(this.gameText);
            for(var i = 0; i < this.health.length; i++){
                this.removeAndHideView(this.health[i]);
            }
            if(!Mexico.device.isDesktop){
                this.removeAndHideView(this.gameButtons[0]);
                this.removeAndHideView(this.gameButtons[1]);
                this.removeAndHideView(this.gameButtons[2]);
                this.removeAndHideView(this.gameButtons[3]);
                this.removeAndHideView(this.fireButton);
            }
        } else if (Mexico.state.current === Mexico.state.end){
            this.removeAndHideView(this.endText);
            this.removeAndHideView(this.headerText);
            this.removeAndHideView(this.playButtonText);
            this.removeAndHideView(this.playButton);

            clearInterval(this.playButtonText.blinkInterval);
        }


        if(state === Mexico.state.intro){
            if(this.introText === _){
                this.introText = new Mexico.Text(16, 16, "ALE   LEVEL 1   SCORE: 00000 ", Mexico.font.large, Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
                this.introText.setCenterScreen();
                this.introText.setY(16);

                this.headerText = new Mexico.Text(16, 16, "ALESTORM VIDEO GAME", Mexico.font.aleXlarge, Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
                this.headerText.setCenterScreen();
                this.headerText.setY(128);

                this.playButton = new Mexico.Button(Mexico.phaser.width - 48 - 4, 4,
                    "button_play", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
                this.playButton.setCenterScreen();
                this.playButton.setYBy(-48);

                this.playButton.setButtonCallback(function(){
                    Mexico.onChangeState(Mexico.state.game);
                }, this);

                this.playButtonText = new Mexico.Text(16, 16, "PLAY", Mexico.font.aleXlarge, Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
                this.playButtonText.setCenterScreen();
                this.playButtonText.setYBy(16);
            }

            this.introText.setText("ALE   LEVEL 1   SCORE: 00000 ");
            this.introText.setCenterScreen();
            this.introText.setY(16);

            var context = this;
            this.playButtonText.blinkInterval = setInterval(
                function(){
                    context.playButtonText.setVisible(!context.playButtonText.element.visible);
                }, 1000);

            this.addView(this.introText);
            this.addView(this.playButton);
            this.addView(this.playButtonText);
            this.addView(this.headerText);

        } else if (state === Mexico.state.game){
            if(this.gameText === _){
                this.gameText = new Mexico.Text(16, 16, "ALE   LEVEL 1   SCORE: 00000 ", Mexico.font.large, Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
                this.gameText.setCenterScreen();
                this.gameText.setY(16);

                this.health = [];
                for(var i = 0; i < 3; i++){
                    this.health.push(new Mexico.Sprite(16, 16, 'item_beer', Mexico.renderer.groups[Mexico.renderer.UI_GROUP]));
                    this.health[i].setPos(16 + i * (48 + 4), 80);
                    this.health[i].setFrame(0);
                    this.addView(this.health[i]);
                }

                this.addView(this.gameText);

                if(!Mexico.device.isDesktop){
                    this.gameButtons = [];

                    this.gameButtons.push(new Mexico.Button(16 + 64, Mexico.res.height - 16 - 64,
                        "button_down", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]));

                    this.gameButtons[0].setButtonCallback(function(){
                        Mexico.input.down = false;
                    }, this);
                    this.gameButtons[0].setButtonUpCallback(function(){
                        Mexico.input.down = true;
                    }, this);


                    this.gameButtons.push(new Mexico.Button(16 + 64, Mexico.res.height - 16 - 64 -64 - 64,
                        "button_up", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]));

                    this.gameButtons[1].setButtonCallback(function(){
                        Mexico.input.up = false;
                    }, this);

                    this.gameButtons[1].setButtonUpCallback(function(){
                        Mexico.input.up = true;
                    }, this);

                    this.gameButtons.push(new Mexico.Button(16, Mexico.res.height - 16 - 64 - 64,
                        "button_left", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]));

                    this.gameButtons[2].setButtonCallback(function(){
                        Mexico.input.left = false;
                    }, this);
                    this.gameButtons[2].setButtonUpCallback(function(){
                        Mexico.input.left = true;
                    }, this);


                    this.gameButtons.push(new Mexico.Button(16 + 64 + 64, Mexico.res.height - 16 - 64 - 64,
                        "button_right", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]));

                    this.gameButtons[3].setButtonCallback(function(){
                        Mexico.input.right = false;
                    }, this);

                    this.gameButtons[3].setButtonUpCallback(function(){
                        Mexico.input.right = true;
                    }, this);


                    this.addView(this.gameButtons[0]);
                    this.addView(this.gameButtons[1]);
                    this.addView(this.gameButtons[2]);
                    this.addView(this.gameButtons[3]);

                    this.fireButton = new Mexico.Button(Mexico.res.width - 16 - 128, Mexico.res.height - 16 - 128,
                        "button_fire", Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);

                    this.fireButton.setButtonCallback(function(){
                        Mexico.input.fire = false;
                    }, this);

                    this.fireButton.setButtonUpCallback(function(){
                        Mexico.input.fire = true;
                    }, this);

                    this.addView(this.fireButton);

                }










            } else {
                for(var i = 0; i < 3; i++){
                    this.health[i].setFrame(0);
                    this.addView(this.health[i]);
                }
                this.addView(this.gameText);

                if(!Mexico.device.isDesktop){
                    for(var i = 0; i < 4; i++){
                        this.addView(this.gameButtons[i]);
                    }
                    this.addView(this.fireButton);
                }

            }


        } else if (state === Mexico.state.end){

            if(this.endText === _){
                this.endText = new Mexico.Text(16, 16, "ALE   LEVEL 1   SCORE: 00000 ", Mexico.font.large, Mexico.renderer.groups[Mexico.renderer.UI_GROUP]);
            }

            this.endText.setText(this.gameText.element.text);
            this.endText.setCenterScreen();
            this.endText.setY(16);

            var context = this;
            this.playButtonText.blinkInterval = setInterval(
                function(){
                    context.playButtonText.setVisible(!context.playButtonText.element.visible);
                }, 1000);

            this.addView(this.endText);
            this.addView(this.playButton);
            this.addView(this.playButtonText);
            this.addView(this.headerText);

        }
    },


    addView: function(view){
        this.views.push(view);
        if(view instanceof Mexico.Text){
            //console.log(view);
            view.rebuild();
        }
        view.setVisible(true);
    },

    removeAndHideView: function(view){
        this.removeView(view);
        view.setVisible(false);
        //view.destroy();
    },

    removeView: function(view){
        for(var i = 0; i < this.views.length; i++){
            if(this.views[i] === view){
                this.views.splice(i, 1);
                break;
            }
        }
    },

    update: function(){
        if(!Mexico.game.paused){
            for(var i = 0; i < this.views.length; i++){
                this.views[i].update();
            }
        }
    },

    tick: function(){
        if(!Mexico.game.paused){
            for(var i = 0; i < this.views.length; i++){
                this.views[i].tick();
            }
        }

        if(!Mexico.device.isDesktop && !Mexico.phaser.scale.isFullScreen){
            Mexico.device.fullScreenLocked = true;
            if(!Mexico.ui.splashScreen.element.visible){
                //this.addView(this.splashScreen);
                Mexico.ui.splashScreen.setVisible(true);
            }
        }
    }
};


Mexico.UiElement = function (x, y, width, height, group) {
    this.init(x, y, width, height, group);
};

Mexico.UiElement.prototype = {
    init: function (x, y, width, height, group) {
        this.x = x;
        this.y = y;
        if (width !== _  && height !== _) {
            this.x1 = this.x + this.width;
            this.y1 = this.y + this.height;
            this.bounds = new Phaser.Rectangle(x, y, width, height);
        }
        this.group = group;
        if(this.element === _){
            this.element = _;
        }
    },

    show: function () {
        this.onShow();
    },
    hide: function () {
        this.onHide();
    },
    onShow: function () {
        this.element.visible = true;
    },
    onHide: function () {
        this.element.visible = false;
    },
    setIndex: function (index) {
        this.index = index;
    },

    update: function(){
    },

    tick: function (){
    },

    destroy: function(){
        this.element.destroy();
    },

    setPos: function(x, y){
        this.x = x;
        this.y = y;
        if (this.bounds !== _) {
            this.x1 = this.x + this.minWidth;
            this.y1 = this.y + this.minHeight;
            this.bounds.x = x;
            this.bounds.y = y;
            this.bounds.width = this.element.width;
            this.bounds.height = this.element.height;
        }
        if(this.element !== _){
            if(this.element.fixedToCamera){
                this.element.fixedToCamera = false;
                this.element.x = x;
                this.element.y = y;
                this.element.fixedToCamera = true;
            } else {
                this.element.x = x;
                this.element.y = y;
            }

        }
    },

    setCenterScreen: function(){
        this.setPos(
            Mexico.res.width / 2 - this.bounds.width / 2,
            Mexico.res.height / 2 + this.bounds.height / 2
        );
    },

    setX: function(x){
        this.setPos(x, this.y);
    },

    setY: function(y){
        this.setPos(this.x, y);
    },

    setPositionBy: function(x, y){
        this.setPos(this.x + x, this.y + y);
    },

    setXBy: function(x){
        this.setPos(this.x + x, this.y);
    },

    setYBy: function(y){
        this.setPos(this.x, this.y + y);
    },

    isVisible: function(){
        return this.element.visible;
    },

    setVisible: function(visible){
        if(this.element !== _){
            this.element.visible = visible;
        }
    }

};

Mexico.Sprite = function (x, y, key, group) {

    this.key = key;

    this.element = Mexico.phaser.add.sprite(x, y, 'texture/' + key, _, group);
    //this.element.anchor.setTo(0.5, 0.5);
    //this.element.scale.set(16, 16);
    //this.element.fixedToCamera = true;

    this.init(x, y, this.element.width, this.element.height, group);

    this.setFrame = function(frame){
        this.element.frame = frame;
    };

    this.rotate = function(deg){
        this.element.angle += deg;
    };

    this.setRotation = function(deg){
        this.element.angle = deg;
    };
};

Mexico.Sprite.prototype = Object.create(Mexico.UiElement.prototype);


Mexico.Text = function (x, y, string, style, group) {

    this.string = string;
    this.style = style;

    this.group = group;

    this.element = Mexico.phaser.add.text(x, y, this.string, this.style, group);


    this.init(x, y, this.element.width, this.element.height, group);


    this.element.fixedToCamera = true;
    this.rebuiltOnce = false;

    this.setText = function(text){
        this.element.text = text;
        this.bounds.width = this.element.width;
        this.bounds.height = this.element.height;
    };

    this.rebuild = function(){
        if(!this.rebuiltOnce){
            return;
        }
        var newElement = Mexico.phaser.add.text(this.x, this.y, this.string, this.style, this.group);
        this.element.destroy();
        this.element = newElement;
        this.setShadow();
        this.rebuiltOnce = true;
    };

    this.setShadow = function(){
        if(this.style === Mexico.font.small){
            this.element.setShadow(1, 1, "#212121", 0, false, true);
        } else if (this.style === Mexico.font.med){
            this.element.setShadow(2, 2, "#212121", 0, false, true);
        } else if (this.style === Mexico.font.large){
            this.element.setShadow(3, 3, "#212121", 0, false, true);
        } else if (this.style === Mexico.font.xLarge){
            this.element.setShadow(4, 4, "#212121", 0, false, true);
        } else if (this.style === Mexico.font.aleMed){
            this.element.setShadow(2, 2, "#013431", 0, false, true);
        } else if (this.style === Mexico.font.aleLarge){
            this.element.setShadow(3, 3, "#013431", 0, false, true);
        } else if (this.style === Mexico.font.aleXlarge){
            this.element.setShadow(4, 4, "#013431", 0, false, true);
        }
    };

    this.doAndDelay = function(now, delay, context, time){
        now(context);
        setTimeout(delay(context), time);
    };

    this.destroy = function(){
        this.element.destroy();
    };

    this.setShadow();

};

Mexico.Text.prototype = Object.create(Mexico.UiElement.prototype);

Mexico.Button = function (x, y, key, group) {

    this.key = key;

    this.element = Mexico.phaser.add.button(x, y, 'texture/' + this.key, _, this, 0, 0, 1, _, group);

    this.element.forceOut = true;
    this.element.fixedToCamera = true;

    this.init(x, y, this.element.width, this.element.height, group);

    this.setButtonCallback = function (callback, context) {
        this.element.onInputUp.dispose();

        this.element.onInputUp.add(callback, context);
    };

    this.setButtonUpCallback = function (callback, context) {
        this.element.onInputDown.dispose();

        this.element.onInputDown.add(callback, context);
    };

    //workaround for button frame not being reset on mobile
    this.setButtonCallback(function () {
    }, this);

    this.setButtonUpCallback(function () {
    }, this);

};

Mexico.Button.prototype = Object.create(Mexico.UiElement.prototype);

/*
 * GAME
 */



Mexico.Game = function(){
};

Mexico.Game.prototype = {

    init: function(){
        this.paused = true;

        this.score = 0;
        this.level = 1;

        this.map = new Mexico.Map();
        this.map.init();
    },

    onStateChange: function(state){
        if(Mexico.state.current === Mexico.state.intro){

        } else if (Mexico.state.current === Mexico.state.game){
            //this.pause();
            this.reset();
        } else if (Mexico.state.current === Mexico.state.end){

        }


        if(state === Mexico.state.intro){

        } else if (state === Mexico.state.game){
            this.start();
        } else if (state === Mexico.state.end){
        }
    },

    start: function(){
        this.score = 0;
        this.level = 1;

        Mexico.ui.gameText.setText("ALE   LEVEL 1   SCORE: 00000 ");
        Mexico.ui.gameText.setCenterScreen();
        Mexico.ui.gameText.setY(16);


        this.map.reset();
        this.map.start();
        this.unPause();
    },

    setScoreBy: function(amount){
        this.score += amount;

        if(this.score % 10000 === 0){
            this.level++;
            this.map.onNextLevel();
        }

        if(this.score < 10000){
            Mexico.ui.gameText.setText("ALE   LEVEL " + this.level + "   SCORE: 0" + this.score + " ");

        } else {
            Mexico.ui.gameText.setText("ALE   LEVEL " + this.level + "   SCORE: " + this.score + " ");
        }
        Mexico.ui.gameText.setCenterScreen();
        Mexico.ui.gameText.setY(16);

    },

    reset: function(){
        this.map.reset();
        //this.start();
        this.pause();
    },

    pause: function(){
        this.paused = true;
    },

    unPause: function(){
        this.paused = false;
    },

    update: function(){
        if(!this.paused){
            this.map.update();
        }
    },

    tick: function(){
        if(!this.paused){
            this.map.tick();
        }
    }


};


Mexico.GameObject = function(){

};

Mexico.GameObject.prototype = {

    init: function(){
        this.x = 0;
        this.y = 0;
    },

    reset: function(){
        this.setX(-999);
    },

    setPos: function(x, y){
        this.x = x;
        this.y = y;
    },

    setX: function(x){
        this.setPos(x, this.y);
    },

    setY: function(y){
        this.setPos(this.x, y);
    },

    setPosBy: function(x, y){
        this.setPos(this.x + x, this.y + y);
    },

    setXBy: function(x){
        this.setPos(this.x + x, this.y);
    },

    setYBy: function(x, y){
        this.setPos(this.x, this.y + y);
    },

    update: function(){

    },

    tick: function(){

    },

    destroy: function(){

    }
};


Mexico.Tile = function (){

    Mexico.Tile.TYPE_WATER = 'tile_water';
    Mexico.Tile.TYPE_LAND = 'tile_land';

    //this.init();

    //this.type = Mexico.Tile.TYPE_WATER;
    this.updateCounter = Math.round( Math.random() * 30);

    this.init = function(x, y, type){
        this.type = type;
        if(this.sprite !== _){
            this.destroy();
        }
        this.sprite = new Mexico.Sprite(x, y, this.type, Mexico.renderer.groups[Mexico.renderer.GAME_OBJECT_GROUP]);
        this.setPos(x, y);
    };

    this.update = function(){
        this.updateCounter++;
        if(this.updateCounter === 20 * 3 || this.updateCounter === 100 * 3){
            this.sprite.setFrame(1);
            this.updateCounter += Math.round( Math.random() * 10);
        }
        if(this.updateCounter === 40 * 3 || this.updateCounter === 80 * 3){
            this.sprite.setFrame(2);
            this.updateCounter += Math.round( Math.random() * 10);
        }
        if(this.updateCounter === 60 * 3){
            this.sprite.setFrame(3);
            this.updateCounter += Math.round( Math.random() * 10);
        }
        if(this.updateCounter === 120 * 3){
            this.sprite.setFrame(0);
            this.updateCounter = Math.round( Math.random() * 30);
        }
    };

    this.setPos = function(x, y){
        this.x = x;
        this.y = y;
        this.sprite.setPos(x, y);
    };


    this.destroy = function(){
        this.sprite.destroy();
    };

};

Mexico.Tile.prototype = Object.create(Mexico.GameObject.prototype);

Mexico.Unit = function(map){

    Mexico.Unit.TYPE_PLAYER_SHIP = 'player_ship';
    Mexico.Unit.TYPE_ENEMY_SHIP = 'enemy_ship';

    Mexico.Unit.SPEED = 2;

    this.map = map;

    this.health = 1;

    this.cannonBalls = [];

    this.fireDelay = 30;

    this.hitBox = new Phaser.Rectangle();


    this.updateCounter = 0;

    this.alive = false;

    //this.init();

    //this.type = Mexico.Unit.TYPE_PLAYER_SHIP;

    this.init = function(x, y, type){
        this.type = type;
        if(this.sprite !== _){
            this.destroy();
        }

        if(this.text !== _){
            this.text.destroy();
        }

        if(this.splash !== _){
            this.splash.destroy();
        }

        this.sprite = new Mexico.Sprite(x, y, this.type, Mexico.renderer.groups[Mexico.renderer.GAME_OBJECT_GROUP]);
        this.splash = new Mexico.Sprite(-999, 0, 'water_splash', Mexico.renderer.groups[Mexico.renderer.GAME_OBJECT_GROUP]);

        if(this.type === Mexico.Unit.TYPE_PLAYER_SHIP){
            this.text = new Mexico.Text(-999, -9999, '', Mexico.font.aleMed, Mexico.renderer.groups[Mexico.renderer.UI_GROUP_SUPER]);
        } else {
            this.text = new Mexico.Text(-999, -9999, '', Mexico.font.large, Mexico.renderer.groups[Mexico.renderer.UI_GROUP_SUPER]);
        }

        if(this.cannonBalls.length === 0){
            if(this.type === Mexico.Unit.TYPE_PLAYER_SHIP){
                for(var i = 0; i < 3; i++){
                    this.cannonBalls.push(new Mexico.CannonBall(this));
                    this.cannonBalls[this.cannonBalls.length - 1].init(-9999, 0);
                }
            } else if(this.type === Mexico.Unit.TYPE_ENEMY_SHIP){
                for(var i = 0; i < 1; i++){
                    this.cannonBalls.push(new Mexico.CannonBall(this));
                    this.cannonBalls[this.cannonBalls.length - 1].init(-9999, 0);
                }
            }
        }

        this.alive = true;

        this.width = 120;
        this.height = 120;

        this.hitBox.setTo(x, y + 70, this.width, 50);

        this.setPos(x, y);
    };

    this.reset = function(){
        this.setX(-999);
        this.alive = false;
        for(var i = 0; i < this.cannonBalls.length; i++){
            this.cannonBalls[i].reset();
        }
        if(this.interval !== _){
            clearInterval(this.interval);
        }
    };

    this.fire = function(){
        if(this.fireDelay >= 30){
            for(var i = 0; i < this.cannonBalls.length; i++){
                if(!this.cannonBalls[i].inTheAir){
                    this.cannonBalls[i].fire();
                    this.fireDelay = 0;
                    break;
                }
            }
        }
    };

    this.update = function(){
        if(this.type === Mexico.Unit.TYPE_ENEMY_SHIP && this.fireDelay >= 30 && Math.round(Math.random() * 60) === 0){
            this.fire();
        }

        if(this.fireDelay < 30){
            this.fireDelay++;
        }
        for(var i = 0; i < this.cannonBalls.length; i++){
            this.cannonBalls[i].update();
        }

        this.updateFrames();
    };

    this.updateFrames = function(){
        this.updateCounter++;
        if(this.updateCounter === 20 * 3){
            this.sprite.setFrame(1);
            this.updateCounter += Math.round( Math.random() * 10);
        }
        if(this.updateCounter === 40 * 3){
            this.sprite.setFrame(2);
            this.updateCounter += Math.round( Math.random() * 10);
        }
        if(this.updateCounter === 60 * 3){
            this.sprite.setFrame(3);
            this.updateCounter += Math.round( Math.random() * 10);
        }
        if(this.updateCounter === 80 * 3){
            this.sprite.setFrame(0);
            this.updateCounter = Math.round( Math.random() * 30);
        }
    };

    this.writeQuote = function(quote){
        clearInterval(this.interval);
        var gameQuote = Mexico.quotes.onKill[Math.floor(Math.random() * Mexico.quotes.onKill.length)];

        if(quote === _){
            if(this.lastQuote !== _){
                if(this.lastQuote === 'I\'m on a ship!'){
                    gameQuote = 'If you don\'t know!';
                } else if (this.lastQuote === 'If you don\'t know!'){
                    gameQuote = 'Well now you know!';
                }
            }
            this.lastQuote = gameQuote;
            this.text.setText(gameQuote);
        } else {
            this.text.setText(quote);
        }
        //var quote = Mexico.quotes.onKill[0];
        this.text.setPos(this.x + 60 - Math.floor(this.text.bounds.width / 2), this.y);

        if(this.text.x < 0){
            this.text.setX(0);
        }

        var context = this;

        this.interval = setInterval(function(){context.text.setYBy(-1)}, 1000 / 60);

        setTimeout(function(){
            context.text.setX(-9999);
            clearInterval(context.interval);
        }, 1000);
    };

    this.overlaps = function(obj){ //has to be Unit
        if(this.hitBox.intersects(obj.hitBox)){
            return true;
        }
        return false;
    };

    this.onGetHit = function(cannonball){
        if(this.type === Mexico.Unit.TYPE_PLAYER_SHIP){
            this.health--;
            if(this.health > -1){
                this.writeQuote('Argh!');
                Mexico.ui.health[this.health].setFrame(1);
            }
            if(this.health <= 0){
                this.alive = false;
                Mexico.onChangeState(Mexico.state.end);
            } else {

                if(cannonball){
                    var context = this;
                    this.splash.setPos(this.x, this.y);
                    this.splash.setFrame(0);
                    setTimeout(function(){context.splash.setFrame(1)}, 250);
                    setTimeout(function(){context.splash.setFrame(2)}, 500);
                    setTimeout(function(){context.splash.setFrame(3)}, 750);
                    setTimeout(function(){context.splash.setX(-999)}, 1000);
                }

                /*this.text.setText('-1 Ale ');
                this.text.setPos(this.x, this.y);

                var context = this;

                this.interval = setInterval(function(){context.text.setYBy(-1)}, 1000 / 60);

                setTimeout(function(){context.onGetHitDelayed()}, 1000);*/
            }

        } else if(this.type === Mexico.Unit.TYPE_ENEMY_SHIP){
            Mexico.game.setScoreBy(1000);
            this.text.setText('1000 ');
            this.text.setPos(this.x, this.y);

            //var context = this;
            //setTimeout(function(){context.onGetHitDelayed()}, 1000);

            var context = this;

            this.alive = false;


            for(var i = 0; i < this.cannonBalls.length; i++){
                this.cannonBalls[i].reset();
            }


            //setTimeout(function(){context.onGetHitDelayed()}, 1000);

            if(cannonball){
                this.map.player.writeQuote();
                this.splash.setPos(this.x, this.y);
                this.splash.setFrame(0);
                setTimeout(function(){context.splash.setFrame(1)}, 250);
                setTimeout(function(){context.splash.setFrame(2)}, 500);
                setTimeout(function(){context.splash.setFrame(3)}, 750);
                setTimeout(function(){context.onGetHitDelayed()}, 1000);
                this.interval = setInterval(function(){context.text.setYBy(-1)}, 1000 / 60);
                if(Math.floor(Math.random() * 5) === 0){
                    this.map.spawnPickup(this);
                }
            } else {
                this.map.returnToPool(this, this.map.activeEnemies, this.map.enemiesPool);
                setTimeout(function(){
                    context.text.setX(-9999);
                    clearInterval(context.interval);
                }, 1000);
                this.interval = setInterval(function(){context.text.setYBy(-1)}, 1000 / 60);
            }




        }
    };

    this.onHeal = function(){
        if(this.type === Mexico.Unit.TYPE_PLAYER_SHIP){
            if(this.health < 3){
                this.health++;
                Mexico.ui.health[this.health - 1].setFrame(0);
                this.writeQuote('Drink their beer!');
            }
        }

    };

    this.onGetHitDelayed = function(){
        this.text.setX(-9999);
        this.splash.setX(-9999);
        clearInterval(this.interval);
        if(this.type === Mexico.Unit.TYPE_ENEMY_SHIP){
            this.map.returnToPool(this, this.map.activeEnemies, this.map.enemiesPool);
        }
        //console.log(this.text);
    };

    this.setPos = function(x, y){
        this.x = x;
        this.y = y;
        if(this.sprite !== _){
            this.sprite.setPos(x + 8, y + 8);
        }
        this.hitBox.x = x;
        this.hitBox.y = y + 70;
    };

    this.destroy = function(){
        this.sprite.destroy();
    };
};

Mexico.Unit.prototype = Object.create(Mexico.GameObject.prototype);

Mexico.CannonBall = function(parent){

    Mexico.CannonBall.SPEED = 4;

    this.map = parent.map;
    this.parent = parent;

    this.hitBox = new Phaser.Rectangle();

    this.inTheAir = false;

    this.init = function(x, y){
        if(this.sprite !== _){
            this.destroy();
        }
        this.sprite = new Mexico.Sprite(x, y, 'player_cannonball', Mexico.renderer.groups[Mexico.renderer.GAME_OBJECT_GROUP]);

        this.width = 16;
        this.height = 16;

        this.hitBox.setTo(x, y, this.width, this.height);

        this.setPos(x, y);
    };

    this.reset = function(){
        this.inTheAir = false;
        this.setX(-999);
    };

    this.fire = function(){
        if(!this.inTheAir){
            this.inTheAir = true;
            if(this.parent.type === Mexico.Unit.TYPE_PLAYER_SHIP){
                this.setPos(this.parent.x + 100, this.parent.y + 78 - 16);
            } else {
                this.setPos(this.parent.x + 20 + 16, this.parent.y + 78 - 16);
            }
        }
    };

    this.update = function(){
        if(this.inTheAir){
            if(this.parent.type === Mexico.Unit.TYPE_PLAYER_SHIP){
                this.setXBy(Math.floor(Mexico.Unit.SPEED * 2));
                if(this.x > Mexico.res.width + 4){
                    this.inTheAir = false;
                } else {
                    for(var i = 0; i < this.parent.map.activeEnemies.length;i++){
                        if(this.parent.map.activeEnemies[i].alive && this.overlaps(this.parent.map.activeEnemies[i])){
                            this.inTheAir = false;
                            this.setX(-999);
                            this.parent.map.activeEnemies[i].onGetHit(true);
                        }
                    }
                }
            } else {
                this.setXBy(-Math.floor(Mexico.Unit.SPEED * 2));
                if(this.x < -20){
                    this.inTheAir = false;
                } else if(this.parent.map.player.alive && this.overlaps(this.parent.map.player)){
                    this.inTheAir = false;
                    this.setX(-999);
                    this.parent.map.player.onGetHit(true);
                }
            }
        } else if (this.x !== -999){
            this.setX(-999);
        }
    };

    this.overlaps = function(obj){ //has to be Unit or cball
        if(this.hitBox.intersects(obj.hitBox)){
            return true;
        }
        return false;
    };

    this.setPos = function(x, y){
        this.x = x;
        this.y = y;
        if(this.sprite !== _){
            this.sprite.setPos(x, y);
        }
        this.hitBox.x = x;
        this.hitBox.y = y;
    };

    this.destroy = function(){
        this.sprite.destroy();
    };

};


Mexico.CannonBall.prototype = Object.create(Mexico.GameObject.prototype);


Mexico.Pickup = function(map){
    //Mexico.Pickup.SPEED = 1;

    this.map = map;

    this.hitBox = new Phaser.Rectangle();

    this.dropped = false;

    this.init = function(x, y){
        if(this.sprite !== _){
            this.destroy();
        }
        this.sprite = new Mexico.Sprite(x, y, 'item_beer', Mexico.renderer.groups[Mexico.renderer.GAME_OBJECT_GROUP]);
        this.sprite.frame = 0;

        this.width = 48;
        this.height = 48;

        this.hitBox.setTo(x, y, this.width, this.height);

        this.setPos(x, y);
    };

    this.reset = function(){
        this.dropped = false;
        this.setX(-999);
    };

    this.drop = function(ship){
        if(!this.dropped){
            this.dropped = true;
            this.setPos(ship.x + 60, ship.y + 72);
        }
    };

    this.update = function(){
        if(this.dropped){
            this.setXBy(Math.floor(-Mexico.Unit.SPEED / 2));

            if(this.x < -60){
                this.dropped = false;
            } else if(this.map.player.alive && this.overlaps(this.map.player)){
                this.dropped = false;
                this.setX(-999);
                this.map.player.onHeal(true);
            }


        } else if (this.x !== -999){
            this.setX(-999);
        }
    };

    this.overlaps = function(obj){ //has to be Unit or cball
        if(this.hitBox.intersects(obj.hitBox)){
            return true;
        }
        return false;
    };

    this.setPos = function(x, y){
        this.x = x;
        this.y = y;
        if(this.sprite !== _){
            this.sprite.setPos(x, y);
        }
        this.hitBox.x = x;
        this.hitBox.y = y;
    };

    this.destroy = function(){
        this.sprite.destroy();
    };
};

Mexico.Pickup.prototype = Object.create(Mexico.GameObject.prototype);

Mexico.Map = function(){

    this.init = function(){

        this.bg = new Mexico.Sprite(0, 0, 'bg_sea', Mexico.renderer.groups[Mexico.renderer.BACKGROUND_GROUP]);

        this.activeTiles = [];
        this.tilesPool = [];

        for(var x = 0; x < Mexico.res.width + 48; x += 48){
            for(var y = 66; y < Mexico.res.height; y += 48){
                this.activeTiles.push(this.getTile());
                this.activeTiles[this.activeTiles.length - 1].init(x, y, Mexico.Tile.TYPE_WATER);
            }
        }

        this.player = new Mexico.Unit(this);
        this.player.init(0, -9999, Mexico.Unit.TYPE_PLAYER_SHIP);


        this.player.update = function(){
            //if(Mexico.input.cursorDown()){
            var dX = 0, dY = 0;

            if(Mexico.input.up && this.map.player.y > 64){
                dY -= 1;
            }
            if(Mexico.input.down && this.map.player.y < Mexico.res.height - this.height){
                dY += 1;
            }
            if(Mexico.input.left && this.map.player.x > 0){
                dX -= 1;
            }
            if(Mexico.input.right && this.map.player.x < Mexico.res.width - this.width){
                dX += 1;
            }

            this.map.player.setPosBy(dX * Mexico.Unit.SPEED, dY * Mexico.Unit.SPEED);

            if(Mexico.input.fire){
                this.fire();
            }

            if(this.fireDelay < 30){
                this.fireDelay++;
            }
            for(var i = 0; i < this.cannonBalls.length; i++){
                this.cannonBalls[i].update();
            }

            this.updateFrames();

            //}
        };

        this.enemiesPool = [];
        this.activeEnemies = [];

        this.enemySpawnDelay = 0;

        this.maxActiveEnemies = 5 + Math.floor(Mexico.game.level * 0.3);
        this.maxSpawnDelay = 180 - (Mexico.game.level * 10);

        for(var i = 0; i < 5; i++){
            this.enemiesPool.push(new Mexico.Unit(this));
        }

        this.activePickups = [];
        this.pickupsPool = [];

        for(var i = 0; i < 5; i++){
            this.pickupsPool.push(new Mexico.Pickup(this));
        }

    };

    this.start = function(){
        this.player.setPos(32, Mexico.res.height / 2);
        this.player.health = 3;
        this.player.alive = true;

        for(var i = 0; i < 3; i++){
            this.spawnEnemy();
        }

        for(var i = 0; i < 3; i++){
            this.activeEnemies[i].setPos(
                Mexico.res.width + 40 + Math.random() * (100),
                66 + 100 * i + ((Math.round(Math.random() * 30)) * i)



                //66 + Math.floor(Math.random() * (Mexico.res.height - 66 - newEnemy.height))
            );
        }
    };

    this.reset = function(){
        this.player.reset();

        for(var i = 0; i < this.enemiesPool.length; i++){
            this.enemiesPool[i].reset();
        }
        for(var i = 0; i < this.activeEnemies.length; i++){
            this.activeEnemies[i].reset();
        }
        for(var i = 0; i < this.activeEnemies.length; i++){
            this.returnToPool(this.activeEnemies[i], this.activeEnemies, this.enemiesPool);
        }

        for(var i = 0; i < this.pickupsPool.length; i++){
            this.pickupsPool[i].reset();
        }
        for(var i = 0; i < this.activePickups.length; i++){
            this.activePickups[i].reset();
        }
        for(var i = 0; i < this.activePickups.length; i++){
            this.returnToPool(this.activePickups[i], this.activePickups, this.pickupsPool);
        }

        this.onNextLevel();

    };

    this.onNextLevel = function(){
        this.maxActiveEnemies = 5 + Math.floor(Mexico.game.level);
        //this.maxSpawnDelay = 180 - (Mexico.game.level * 30);
        this.maxSpawnDelay = 140;
        if(this.maxSpawnDelay < 0){
            this.maxSpawnDelay = 0;
        }
        Mexico.Unit.SPEED = 2 + Math.floor(Mexico.game.level / 5);

        if(Mexico.Unit.SPEED > 5){
            Mexico.Unit.SPEED = 5;
        }
    };

    this.getTile = function(){
        if(this.tilesPool.length === 0){
            var result = new Mexico.Tile(this);
            return result;
        } else {
            var result = this.tilesPool[0];

            this.tilesPool.splice(0, 1);

            return result;
        }
    };

    this.getEnemy = function(){
        if(this.enemiesPool.length === 0){
            var result = new Mexico.Unit(this);
            return result;
        } else {
            var result = this.enemiesPool[0];

            this.enemiesPool.splice(0, 1);

            return result;
        }
    };

    this.getPickup = function(){
        if(this.pickupsPool.length === 0){
            var result = new Mexico.Pickup(this);
            return result;
        } else {
            var result = this.pickupsPool[0];

            this.pickupsPool.splice(0, 1);

            return result;
        }
    };

    this.returnToPool = function(obj, active, pool){
        obj.reset();

        for(var i = 0; i < active.length; i++){
            if(active[i] === obj){
                active.splice(i, 1);
                break;
            }
        }

        pool.push(obj);
    };

    this.update = function(){
        this.player.update();

        for(var i = 0; i < this.activeTiles.length; i++){
            this.activeTiles[i].update();
            this.activeTiles[i].setXBy(Math.floor(-Mexico.Unit.SPEED / 2));
            if(this.activeTiles[i].x <= -48){
                this.activeTiles[i].setXBy(48 * 18); //24 == tile size in px, 36 == # of tiles in width of screen
                //this.needTileUpdate = true;
            }
        }

        try {
            for(i = 0; i < this.activeEnemies.length; i++){
                if(this.activeEnemies[i].alive){
                    this.activeEnemies[i].update();
                    this.activeEnemies[i].setXBy(-Mexico.Unit.SPEED);
                    if(this.activeEnemies[i].overlaps(this.player)){
                        this.activeEnemies[i].onGetHit(false);
                        this.player.onGetHit(false);
                        break;
                    } else if (this.activeEnemies[i].x < -122){
                        this.returnToPool(this.activeEnemies[i], this.activeEnemies, this.enemiesPool);
                        break;
                    }
                } else {
                    //console.log(this.activeEnemies[i]);
                    this.activeEnemies[i].setXBy(Math.floor(-Mexico.Unit.SPEED / 2));
                    this.activeEnemies[i].splash.setXBy(Math.floor(-Mexico.Unit.SPEED / 2));
                    this.activeEnemies[i].text.setXBy(Math.floor(-Mexico.Unit.SPEED / 2));
                }
            }
        } catch (e){
            console.log(e);
            this.reset();
            //console.log();
        }

        for(i = 0; i < this.activePickups.length; i++){
            if(this.activePickups[i].dropped){
                this.activePickups[i].update();
            }
        }

        if(this.enemySpawnDelay < this.maxSpawnDelay){
            this.enemySpawnDelay++;
        } else if(this.activeEnemies.length < this.maxActiveEnemies){
            this.enemySpawnDelay = Math.round(Math.random() * 30);
            this.spawnEnemy();
        }
    };

    this.spawnEnemy = function(){
        var newEnemy = this.getEnemy();
        newEnemy.init(0, 0, Mexico.Unit.TYPE_ENEMY_SHIP);
        newEnemy.alive = true;
        newEnemy.setY(66 + Math.floor(Math.random() * (Mexico.res.height - 66 - newEnemy.height)));
        newEnemy.setX(Mexico.res.width + 40 + Math.random() * (40));
        this.activeEnemies.push(newEnemy);
    };

    this.spawnPickup = function(ship){
        var pickup = this.getPickup();
        pickup.init();
        pickup.drop(ship);
        this.activePickups.push(pickup);
    };

    this.tick = function(){
        //console.log(this.activeEnemies);
    };


};

Mexico.Map.prototype = Object.create(Mexico.GameObject.prototype);

/*
 * Statistics
 */

Mexico.Statistics = function(){

};

Mexico.Statistics.prototype = {

    init: function(){
        this.secondsPlayed = 0;
        //this.distanceTravelled = 0;
    },

    update: function(){

    },

    tick: function () {
        this.secondsPlayed++;
    }


};

/*
 * Inits game
 */

Mexico.init(this);

/**
 * Created by leonard on 4-5-17.
 */

/*

(function () {

    var header = document.getElementsByClassName("go-down")[0];

    header.addEventListener("animationend", function () {
        var text = document.getElementsByClassName("go-down-delayed");
        for (var i = 0; i < text.length; i++) {
            text[i].style.transform = "translateY(0px)";
        }
    }, false);

    var resizeTimer = 10;

    var width, height;

    var firstTime = true;

    var update = function(){
        if(resizeTimer < 10){
            resizeTimer++;
        } else {
            if(firstTime || width !== (window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth) || (height) !== (window.innerHeight
                || document.documentElement.clientHeight
                )){
                onResize();
                firstTime = false;
            }
        }

        setTimeout(update, 60);
    };

    function onResize(){
        width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;


        var p = document.getElementsByTagName("p");
        var dt = document.getElementsByTagName("dt");
        var dd = document.getElementsByTagName("dd");
        var h1 = document.getElementsByTagName("h1");
        var label = document.getElementsByTagName("label");

        var navLink = document.getElementsByClassName("nav-link");



        for (var i = 0; i < captcha.length; i++) {
            if(width > 800){
                captcha[i].style.transform = "scale(1)";
            } else {
                captcha[i].style.transform = "scale(0.77)";
            }
        }

        //transform: scale(0.77);

        for (var i = 0; i < p.length; i++) {
            if(width > 800){
                p[i].style.fontSize = "32px";
                p[i].style.textShadow = "2px 2px #212121";
            } else {
                p[i].style.fontSize = "16px";
                p[i].style.textShadow = "1px 1px #212121";
            }
        }

        for (i = 0; i < dt.length; i++) {
            if(width > 800){
                dt[i].style.fontSize = "32px";
                dt[i].style.textShadow = "2px 2px #212121";
            } else {
                dt[i].style.fontSize = "16px";
                dt[i].style.textShadow = "1px 1px #212121";
            }
        }

        for (i = 0; i < dd.length; i++) {
            if(width > 800){
                dd[i].style.fontSize = "32px";
                dd[i].style.textShadow = "2px 2px #212121";
            } else {
                dd[i].style.fontSize = "16px";
                dd[i].style.textShadow = "1px 1px #212121";
            }
        }

        for (i = 0; i < label.length; i++) {
            if(width > 800){
                label[i].style.fontSize = "32px";
                label[i].style.textShadow = "2px 2px #212121";
            } else {
                label[i].style.fontSize = "16px";
                label[i].style.textShadow = "1px 1px #212121";
            }
        }

        for (i = 0; i < h1.length; i++) {
            if(width > 800){
                h1[i].style.fontSize = "64px";
                h1[i].style.textShadow = "4px 4px #212121";
            } else {
                h1[i].style.fontSize = "32px";
                h1[i].style.textShadow = "2px 2px #212121";
            }
        }

        for (i = 0; i < navLink.length; i++) {
            if(width > 800){
                navLink[i].style.fontSize = "32px";
                navLink[i].style.textShadow = "2px 2px #212121";
            } else {
                navLink[i].style.fontSize = "16px";
                navLink[i].style.textShadow = "1px 1px #212121";
            }
        }
    }


    update();

})();

*/
