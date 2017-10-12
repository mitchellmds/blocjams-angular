(function () {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;

    /**
     * @function
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function (song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function () {
        $rootScope.$apply(function () {
          SongPlayer.currentTime = currentBuzzObject.getTime();
          var duration = currentBuzzObject.getDuration();
          if (SongPlayer.currentTime === duration) {
            console.log("End of song");
            SongPlayer.next();
          }
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
     * @function playSong
     * @desc Plays the currentBuzzObject and sets the property of the song Object to true
     * @param {Object} song
     */
    var playSong = function (song) {
      currentBuzzObject.play();
      song.playing = true;
    }

     }//end of function
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();