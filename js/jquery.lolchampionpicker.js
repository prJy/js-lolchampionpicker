/*!
 * * jQuery League of Legends Champion Picker v 0.0.5
 *
 * Copyright Anderson Oliveira [https://github.com/prJy/]
 * Repository URL: https://github.com/prJy/js-lolchampionpicker
 * Released under the MIT license
 */
(function($) {
    $.fn.lolChampionPicker = function(options) {
        that = this;
        const settings = $.extend({
            lolPatchApiVersion: "6.24.1",
            lang: "en_US",
            image: {
                width: 60,
                height: 60,
            },
            messages: {
                emptySelectedChampionError: "Pick a champion to continue!",
                unvalidJSONTextError: "Invalid JSON text, failed to import!"
            }
        }, options);

        const lolChampionDataURL = `https://ddragon.leagueoflegends.com/cdn/${settings.lolPatchApiVersion}/data/${settings.lang}/champion.json`;

        const renderData = (champions) => {
            $.each(champions, (index, champion) => {
                let html = `<img src="https://ddragon.leagueoflegends.com/cdn/${settings.lolPatchApiVersion}/img/champion/${champion.image.full}" height="${settings.image.height}" width="${settings.image.width}" class="off pickable" id="${champion.id}"/>`
                that.append(html);
            });
        };

        const checkImage = (selectedImage) => {
            $(selectedImage).removeClass(championPicker.isUnselectedTag);
            $(selectedImage).addClass(championPicker.isSelectedTag);
        }

        const unCheckImage = (selectedImage) => {
            $(selectedImage).addClass(championPicker.isUnselectedTag);
            $(selectedImage).removeClass(championPicker.isSelectedTag);
        }

        const validateSelectedChampionsData = (champs) => {
            if (champs.length === 0) {
                alert(settings.messages.emptySelectedChampionError);
                return;
            }
            return true;
        }

        const fetchAllSelectedChampions = () => {
            return $(`img.${championPicker.isSelectedTag}`, that);
        }

        const fetchAllImages = () => {
            return $('img', that);
        }

        const selectOrUnselectAll = (select) => {
            const selectedChamps = fetchAllImages();

            for (let i = 0; i < selectedChamps.length; i++) {
                if (select) {
                    checkImage(selectedChamps[i]);
                } else {
                    unCheckImage(selectedChamps[i]);
                }
            }
        }

        const isValidTextToParseJSON = (json) => {
            try {
                if (json == "") return;
                JSON.parse(json);
            }
            catch (e) {
                return;
            }
            return true;
        }

        const isFileValidToParse = (json) => {
            if(!isValidTextToParseJSON(json)) {
                alert(settings.messages.unvalidJSONTextError);
                return;
            }
            return true;
        }

        const loadJSON = (json) =>{
            if (!isFileValidToParse(json)) return;
            selectOrUnselectAll(false);
            const picked = JSON.parse(json);
            const selectedChamps = fetchAllImages().filter( (index, value, arr) => {
                return $.inArray(value.id, picked) >= 0;
            });

            for (let i = 0; i < selectedChamps.length; i++) {
                checkImage(selectedChamps[i]);
            }

        }

        const getJSON = () => {
            const selectedChamps = fetchAllSelectedChampions();
            const picked = [];
            if (!validateSelectedChampionsData(selectedChamps)) return;
            for (let i = 0; i < selectedChamps.length; i++) {
                picked.push(selectedChamps[i].id);
            }
            return JSON.stringify(picked);
        }

        const fetchChampionsFromLOLApiAndRender = () => {
            $.ajax({
                url: lolChampionDataURL,
                context: this,
                processData: false
            })
            .then((data) => {
                renderData(data.data);
            });
        }

        $(that).on('click', ".pickable", (event) => {
            const selectedImage = $(event.target);
            if (selectedImage.hasClass(championPicker.isUnselectedTag)) {
                checkImage(selectedImage);
                return;
            }
            unCheckImage(selectedImage);
        });

        championPicker = {
            element: $(that),
            isSelectedTag: 'on',
            isUnselectedTag: 'off',
            init: () => {
                that.addClass('lolcpk');
                fetchChampionsFromLOLApiAndRender();
            },
            loadChampionsFromJSON: (json) => {
                loadJSON(json);
            },
            returnChampionsInJSON: () => {
                return getJSON();
            },
            selectAll: () => {
                selectOrUnselectAll(true);
            },
            unSelectAll: () => {
                selectOrUnselectAll(false);
            }
        };

        championPicker.init();
        return championPicker;
    };

}(jQuery));
