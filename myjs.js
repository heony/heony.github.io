$(document).ready(function() {
    $('#log_out_btn').hide();


    $(document).keydown(function(e) {
        // F5, ctrl + F5, ctrl + r 새로고침 막기
        var allowPageList = new Array('/a.php', '/b.php');
        var bBlockF5Key = true;
        for (number in allowPageList) {
            var regExp = new RegExp('^' + allowPageList[number] + '.*', 'i');
            if (regExp.test(document.location.pathname)) {
                bBlockF5Key = false;
                break;
            }
        }

        if (bBlockF5Key) {
            if (e.which === 116) {
                if (typeof event == "object") {
                    event.keyCode = 0;
                }
                return false;
            } else if (e.which === 82 && e.ctrlKey) {
                return false;
            }
        }
    });
    //-----------------------------------------------------------------
    $('.sign > input:first-of-type').focus(function() {
        $(this).css({
            'backgroundColor': 'rgba(0,0,0,0.0)',
            'color': 'black'
        });
    });
    //회원가입 양식 검사 ID--------------------------------------------
/*
    $('#idcb').on('click', function() {
        console.log("bbb", $('#idc').serialize());
        $.ajax({
                method: "POST",
                url: "/idcheck",
                data: $('#idc').serialize()
            })
            .done(function(data) {

                var regexr = /^[A-Za-z0-9]{4,10}$/;
                if (regexr.test($('#idc').val()) !== true && $('#idc').val() !== '') {
                    $('#idc').css({
                        'backgroundColor': 'rgba(0,0,0,0.2)',
                        'color': 'rgba(150, 0, 0, 1)'
                    });
                    $('.check_id_and_password').remove();
                    $('#idcb').after('<p class="check_id_and_password id" ><i class="fa fa-times-circle" aria-hidden="true"></i> 8~16 words (alphabet or number)</p>');

                } else if (data.msg === "wrong") {
                    $('.check_id_and_password.id, .check_id_and_password.used_id').remove();
                    $('#idcb').after('<p class="check_id_and_password used_id" ><i class="fa fa-times-circle" aria-hidden="true"></i> used ID</p>');
                    console.log('!!!!');

                } else if ($('#idc').val() !== '' && data.msg === "사용가능") {
                    $('#idc').css({
                        'backgroundColor': '#555',
                        'color': 'black'
                    });
                    $('.check_id_and_password.id, .check_id_and_password.used_id').remove();

                }
            });
    });




    //회원가입 양식 검사 PW--------------------------------------------
    $('#pwc').blur(function() {
        var regexr = /^[A-Za-z0-9]{8,16}$/;
        if (regexr.test($(this).val()) !== true && $('#pwc').val() !== '') {
            $(this).css({
                'backgroundColor': 'rgba(0,0,0,0)',
                'color': 'rgba(150, 0, 0, 1)'
            });
            $('.check_id_and_password.pw').remove();
            $(this).after('<p class="check_id_and_password pw" ><i class="fa fa-times-circle" aria-hidden="true"></i> 8~16 words (alphabet or number)</p>');

        } else if ($('#pwc').val() !== '') {
            $(this).css({
                'backgroundColor': '#555',
                'color': 'black'
            });
            $('.check_id_and_password.pw').remove();

        }
    });
    //회원가입 양식 검사 EMAIL--------------------------------------------
    $('#emc').blur(function() {
        var regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regexr.test($(this).val()) !== true && $('#emc').val() !== '') {
            $(this).css({
                'backgroundColor': 'rgba(0,0,0,0)',
                'color': 'rgba(150, 0, 0, 1)'
            });
            $('.check_id_and_password.em').remove();
            $(this).after('<p class="check_id_and_password em" ><i class="fa fa-times-circle" aria-hidden="true"></i> use E-mali form</p>');

        } else if ($('#emc').val() !== '') {
            $(this).css({
                'backgroundColor': '#555',
                'color': 'black'
            });
            $('.check_id_and_password.em').hide();

        }
    });

    $('#sign_up_confirm').on('click', function() {
        var regexr_id = /^[A-Za-z0-9]{4,10}$/;
        var regexr_pw = /^[A-Za-z0-9]{8,16}$/;
        var regexr_em = /^[0-9aidA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regexr_id.test($('#idc').val()) !== true && $('.check_id_and_password.used_id') !== undefined) {
            alert('id확인해랑...');
        } else if (regexr_pw.test($('#pwc').val()) !== true && $('#pwc').val() !== '') {
            alert('pw확인해랑...');
        } else if (regexr_em.test($('#emc').val()) !== true && $('#ewc').val() !== '') {
            alert('email확인해랑...');
        } else {
            $.ajax({
                    method: "POST",
                    url: "/signup",
                    data: $('#signin_form').serialize()
                })
                .done(function(data) {

                    $('#welcome_message').slideUp('slow');
                    $('#login_form').slideDown('slow');
                    $('.check_id_and_password').remove();
                    $('#sign_in').slideUp('slow');
                    $('#want_sign_wrap').slideDown('normal');

                });
                alert('welcome!!!');
        }

    });



    //로그인 버튼 누르면?--------------------------------------------------------------
   $('#login_btn').on('click', function() {
        console.log($('#login_form').serialize());

        $.ajax({
                method: "POST",
                url: "/signin",
                data: $('#login_form').serialize()
            })
            .done(function(data) {
                if (data.auth_res) {
                    $('.check_id_and_password').hide();
                    $('#two,#three').slideDown('slow');
                    $('#log_out_btn').fadeIn('slow');
                    $('#login_form, #four').slideUp('slow');
                    $('#welcome_message').slideDown('slow');

                } else if (data.msg === "ID가 틀려먹었어요") {
                    $('.check_id_and_password').hide();
                    $('#id').focus();
                    $('#login_btn').after('<p class="check_id_and_password" ><i class="fa fa-times-circle" aria-hidden="true"></i> Check ID!</p>');
                    $('#login_form').css('padding-bottom', '0');
                    $('#id, #pw').val('');
                } else {
                    $('.check_id_and_password').hide();
                    $('#pw').focus();
                    $('#login_btn').after('<p class="check_id_and_password" ><i class="fa fa-times-circle" aria-hidden="true"></i> Check Password!</p>');
                    $('#login_form').css('padding-bottom', '0');
                    $('#pw').val('');
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log("fail :", jqXHR);
            })

    });*/
    //로그아웃 버튼----------------------------------------
    $('#log_out_btn').on('click', function() {

        //로그아웃 시 아이콘 초기화-----------------------------
        $('#resume_icon_box').show();
        $('#hide_resume1').hide();
        $('#hide_resume2').hide();
        $('#hide_resume3').hide();
        $('#hide_resume4').hide();
        $('#hide_resume5').hide();
        $('#hide_resume6').hide();
        //------------------------------------------
        $('#two,#three,#welcome_message').slideUp('slow');
        $('#log_out_btn').fadeOut('slow');
        $('#login_form').slideDown('slow');
        $('#four').slideDown('slow');
        $('#id, #pw').val('');

    })

    //회원가입 버튼 ------------------------------------------
    $('#sign_in_btn').on('click', function() {
        /*$('#login_form').slideUp('slow');
        $('#welcome_message').slideDown('slow');
        $('#want_sign_wrap').slideUp('slow');
        $('#sign_in').slideDown('slow');*/
        $('#two,#three').slideDown('slow');
        $('#log_out_btn').fadeIn('slow');
        $('#login_form, #four').slideUp('slow');
        $('#welcome_message').slideDown('slow');
    });

    //회원가입 취소버튼-------------------------------
    $('#cancel').on('click', function() {
        $('#welcome_message').slideUp('slow');
        $('#login_form').slideDown('slow');

        $('.sign > input:first-of-type').val('').css('backgroundColor', 'rgba(0,0,0,0)');
        $('.check_id_and_password').remove();
        $('#sign_in').slideUp('slow');
        $('#want_sign_wrap').slideDown('normal');
    });
    //아이콘 상태변경------------------------------------------------------------
    $('#resume_icon1').on('click', function() {
        $('#resume_icon_box').slideUp('slow');
        $('#hide_resume1').slideDown('slow');
    });
    $('#hide_resume1').on('click', function() {
        $('#hide_resume1').slideUp('slow');
        $('#resume_icon_box').slideDown('slow');
    });
    $('#resume_icon2').on('click', function() {
        $('#resume_icon_box').slideUp('slow');
        $('#hide_resume2').slideDown('slow');

    });
    $('#hide_resume2').on('click', function() {
        $('#hide_resume2').slideUp('slow');
        $('#resume_icon_box').slideDown('slow');
    });
    $('#resume_icon3').on('click', function() {
        $('#resume_icon_box').slideUp('slow');
        $('#hide_resume3').slideDown('slow');
        $('#full_progress_html,#full_progress_css').css('width', '90%');
        $('#full_progress_js,#full_progress_jq').css('width', '70%');
    });
    $('#hide_resume3').on('click', function() {
        $('#hide_resume3').slideUp('slow');
        $('#resume_icon_box').slideDown('slow');
        $('#full_progress_html,#full_progress_css').css('width', '0%');
        $('#full_progress_js,#full_progress_jq').css('width', '0%');
    });
    $('#resume_icon4').on('click', function() {
        $('#resume_icon_box').slideUp('slow');
        $('#hide_resume4').slideDown('slow');

    });
    $('#hide_resume4').on('click', function() {
        $('#hide_resume4').slideUp('slow');
        $('#resume_icon_box').slideDown('slow');
    });
    $('#resume_icon5').on('click', function() {
        $('#resume_icon_box').slideUp('slow');
        $('#hide_resume5').slideDown('slow');

    });
    $('#hide_resume5').on('click', function() {
        $('#hide_resume5').slideUp('slow');
        $('#resume_icon_box').slideDown('slow');
    });
    $('#resume_icon6').on('click', function() {
        $('#resume_icon_box').slideUp('slow');
        $('#hide_resume6').slideDown('slow');

    });
    $('#hide_resume6').on('click', function() {
        $('#hide_resume6').slideUp('slow');
        $('#resume_icon_box').slideDown('slow');
    });



});
