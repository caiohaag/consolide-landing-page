AOS.init();

//SMOOTH SCROLL

jQuery(($) => {
    // The speed of the scroll in milliseconds
    const speed = 1000;
  
    $('a[href*="#"]')
      .filter(
        (i, a) =>
          a.getAttribute("href").startsWith("#") ||
          a.href.startsWith(`${location.href}#`)
      )
      .unbind("click.smoothScroll")
      .bind("click.smoothScroll", (event) => {
        const targetId = event.currentTarget.getAttribute("href").split("#")[1];
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          event.preventDefault();
          $("html, body").animate(
            { scrollTop: $(targetElement).offset().top },
            speed
          );
        }
      });
  });

//SLIDER
if ($(".slider__quem__precisa").length) {
    new Splide(".slider__quem__precisa", {
      pagination: false,
      type: "loop",
      gap: "0",
      perPage: 5,      
      breakpoints: {
        1350: {
          perPage: 4,
          arrows: true,
        },
        1024: {
          perPage: 3,
          arrows: true,
        },
        767: {
          perPage: 2,
          arrows: true,
        },
        500: {
          perPage: 1,
          arrows: true,
        },
      },
    }).mount();
  }

//Máscara telefone
var v_obj;
var v_fun;
/* Máscaras ER */
function execmascara(){
   v_obj.value=v_fun(v_obj.value);       
}
function mascara(o,f){
    v_obj=o;
    v_fun=f;      
    setTimeout(execmascara(),1);
} 
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function id( el ){
    return document.getElementById( el );
}
window.onload = function(){
    id('telefone').onkeypress = function(){
        mascara( this, mtel );
    }
    id('telefone').maxLength = 15;
}

//VALIDAÇÃO DO FORM
var VALIDATE = $("[data-validate]");
 
 $(VALIDATE).each(function () {
   $(this).validate({
     submitHandler: function (form) {              
       var dados = $(form).serialize(),
         _action = $(form).attr("action"),
         btnForm = $(form).find("button[type=submit]"),
         textoBtn = btnForm.text(),
         inputs = $(form).find(".form-control"),
         _goal = $(form).data("goal"),
         _goalTag = _goal;
 
       $(form).find(".msg-whait").fadeIn();
 
       $.ajax({
         type: "POST",
         url: _action,
         data: dados,
         dataType: "json",
 
         success: function (data) {
           setTimeout(function () {
             inputs.val("");
             btnForm.text(textoBtn).prop("disabled", false);
 
             if (data.msg != "") {
               inputs.val("");              
               $(form).find(".msg-whait").hide();
               $(form).find(".msg-error").hide();
               $(form).find(".msg-success").fadeIn();
 
               setTimeout(function () {
                 $(form).find(".msg-success").fadeOut();
               }, 4000);
             }
           }, 500);
         },
         error: function (error) {
           error = error.responseJSON;
           setTimeout(function () {
             btnForm.text(textoBtn).prop("disabled", false);
 
             if (data.msg != "") {
               $(form).find(".msg-whait").hide();
               $(form).find(".msg-success").hide();
               $(form).find(".msg-error").fadeIn();
 
               setTimeout(function () {
                 $(form).find(".msg-error").fadeOut();
               }, 2000);
             }
           }, 5000);
         },
       });
 
       return false;
     },
   });
 });