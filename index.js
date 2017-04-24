'use strict';

const DF = (function () {
    // Criação dos elementos
    let elCanvas = document.createElement('canvas');
    let elVideo = document.createElement('video');
    let elInput = document.createElement('input');

    // Mapeamento de funcionalidades da HTML5
    let funcionalidades = {
        canvas: false,
        canvasText: false,
        video: false,
        videoH264: false,
        videoOgg: false,
        videoWebM: false,
        localStorage: 'localStorage' in window,
        webWorker: 'Worker' in window,
        aplicacoesOffline: 'applicationCache' in window,
        geolocation: 'geolocation' in navigator,
        microdata: 'getItems' in document,
        history: 'pushState' in history,
        inputSearch: verificaSuporteInput('search'),
        inputNumber: verificaSuporteInput('number'),
        inputRange: verificaSuporteInput('range'),
        inputColor: verificaSuporteInput('color'),
        inputTel: verificaSuporteInput('tel'),
        inputUrl: verificaSuporteInput('url'),
        inputEmail: verificaSuporteInput('email'),
        inputDate: verificaSuporteInput('date'),
        inputMonth: verificaSuporteInput('month'),
        inputWeek: verificaSuporteInput('week'),
        inputTime: verificaSuporteInput('time'),
        inputDateTime: verificaSuporteInput('datetime'),
        inputDateTimeLocal: verificaSuporteInput('datetime-local'),
        inputPlaceholder: 'placeholder' in elInput
    };

    // Verifica o suporte a canvas
    funcionalidades.canvas = !!elCanvas.getContext;

    // Verifica o suporte a texto no canvas
    if (funcionalidades.canvas) {
        let contexto = elCanvas.getContext('2d');
        funcionalidades.canvasText = typeof contexto.fillText === 'function';
    }

    // Verifica o suporte a vídeo
    funcionalidades.video = !!elVideo.canPlayType;

    // Verifica o suporte aos formatos de vídeo
    if (funcionalidades.video) {
        funcionalidades.videoH264 = elVideo.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        funcionalidades.videoOgg = elVideo.canPlayType('video/ogg; codecs="theora, vorbis"');
        funcionalidades.videoWebM = elVideo.canPlayType('video/webm; codecs="vp8, vorbis"');
    }

    /**
     * Verifica o suporte aos diversos tipos de input. Se após setar o atributo 'type' do input para o tipo
     * desejado o browser ignorar e o atributo continuar com o valor 'text', significa que o browser não
     * dá suporte para o tipo de input informado.
     */
    function verificaSuporteInput(tipo) {
        let suporteOk = false;
        elInput.setAttribute('type', tipo);
        suporteOk = elInput.type !== 'text';
        elInput.setAttribute('type', 'text'); // reseta para os demais testes
        return suporteOk;
    }

    return funcionalidades;
}());