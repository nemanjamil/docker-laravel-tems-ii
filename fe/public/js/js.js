

$(document).ready(function () {

    var $serverlink = "";

    $.ajax({
        url: "/env.json",
        dataType: 'json',
        async: false,
        success: function(data) {
             $serverlink = data.host;
        }
    });

    // var $serverlink = "http://examserver/";
    // var $serverlink = "http://examserver.beodigital.tech/";
    var $duallist = 'select[name="duallistbox_demo1[]"]';
    var demo1 = $($duallist).bootstrapDualListbox({
        infoText: '',
        selectorMinimalHeight: 300
    });


    $("#demoform button").click(function (ev) {
        ev.preventDefault();

        serialData = $($duallist).val();
        hashSaltvalue = $("#inputhashsalt").val();
        successpercent = $("#successpercent").val();

        if (serialData.length == 0) {
            $("#popuptext").html("You must have one exam selected");
            $('.modal').modal('show');
            return;
        }

        if (!hashSaltvalue) {
            $("#popuptext").html("");
            $("#popuptext").html("You must enter HASH_SALT");
            $('.modal').modal('show');
            return;
        }
        if (!successpercent) {
            $("#popuptext").html("");
            $("#popuptext").html("You must enter seccess percent");
            $('.modal').modal('show');
            return;
        }

        $url = $serverlink + "api/1.0/sentdata";
        $.ajax({
            url: $url,
            type: "POST",
            //dataType: "JSON",
            data: {data: serialData, hash_salt: hashSaltvalue, savedata: $(this).attr("value"), successpercent: successpercent },
            beforeSend: function() {
                $("#loading-button").html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
            },
            success: function (result) {
                if (result.status) {
                    $("#loading-button").html('');
                    $(".jsonview").text(vkbeautify.json(result.json));
                    $(".showxml").text(vkbeautify.xml(result.xml, 5));  // text, html, append

                    if (result.savedata) {
                            $("#popuptext").html("");
                            serverlinkStorage = $serverlink + 'storage/'
                            $('#popuptext').append(
                                $('<ul>').append(
                                    $('<li>').append(
                                        $('<a>').attr('href', serverlinkStorage + result.savedata + '/' + result.savedata + '.json').attr('target', '_blank').append("JSON")
                                    ),

                                    $('<li>').append(
                                        $('<a>').attr('href', serverlinkStorage + result.savedata + '/' + result.savedata + '.xml').attr('target', '_blank').append("XML")
                                    ),
                                    $('<li>').append(
                                        $('<a>').attr('href', serverlinkStorage + result.savedata + '/' + result.savedata + '.SALT').attr('target', '_blank').append("SALT")
                                    )
                                ));

                            $('.modal').modal('show');
                        return;
                    }

                } else {
                    $("#popuptext").html("");
                    $("#popuptext").html(result.message);
                    $('.modal').modal('show');
                    $("#loading-button").html('');
                    return;
                }
            },
            error: function () {
                alert("Error oops.");
            }
        });

    });


    $("#selectList").on("change", function () {

        firstelement = demo1.bootstrapDualListbox()[0].value;
        var firstitems = firstelement.split('|');
        firstlangitem = firstitems[1];
        firstsampleitem = firstitems[2];

        $(".jsonview").empty();
        $(".showxml").empty();

        allelements = $(this).val();

        if (allelements.length > 1) {
            last_element = allelements[allelements.length - 1];
            var items = last_element.split('|');
            langitem = items[1];
            sampleitem = items[2];


            if (firstlangitem != langitem) {

                $('#selectList option[value="' + last_element + '"]').prop('selected', false);
                demo1.bootstrapDualListbox('refresh', true);

                $("#popuptext").html("");
                $("#popuptext").html("You can't add this exam set, because the one you already selected has an other language");
                $('.modal').modal('show');

            }

            if (firstsampleitem != sampleitem) {

                $('#selectList option[value="' + last_element + '"]').prop('selected', false);
                demo1.bootstrapDualListbox('refresh', true);

                $("#popuptext").html("");
                if (firstsampleitem==1) {

                    $("#popuptext").html("You can't add this exam set, because the one you already selected is a " +
                        "sample exam set and this must not be combiened with a normal exam set");
                } else {
                    $("#popuptext").html("You can't add this exam set, because the one you already selected is a " +
                        "normal exam set and this must not be combiened with a sample exam set");
                }

                $('.modal').modal('show');

            }

        }
    });


    var $loading = $('#loading');

    function xhr_get(url) {
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $loading.html("Loading....");
            }
        })
            .always(function () {
                $loading.html("");
            })
            .fail(function () {
                $loading.html("error please fix");
            });
    }


    var $url = $serverlink + "api/1.0/all";
    xhr_get($url).done(function (data) {
        $($duallist).empty();
        $.each(data, function (i, item) {
            value = item["sqms_exam_version_id"] + '|' + item["sqms_language_id"] + '|' + item["sqms_exam_version_sample_set"]
            $($duallist).append($('<option sample="' + item["sqms_exam_version_sample_set"] + '" lang="' + item["sqms_language_id"] + '" value="' + value + '">' + item["sqms_exam_version_id"] + ' ' + item["sqms_exam_version_name"] + ' </option>'));
        });
        $($duallist).bootstrapDualListbox('refresh', true);
    });


});

