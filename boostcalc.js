/*The equations completed on this project are done by Zack Schaper.
This has been developed by Blake Connally with www.blakecodes.com*/



$('#checkbutton').on('click', function () {



    /*Get Info*/

    var $piston = $('#piston').val();

    var $crankshaft = $('#crankshaft').val();

    var $headgasket = $('#headgasket').val();

    var $fuelType = $('#fueltype').val();



    /*Data Arrays*/

    var crankshafts = [

        ["S52",89.6],

        ["S50",86],

        ["M52",85],

        ["M50",75]

    ]



    var pistons = [

        ["M50",84,9000,0],

        ["M52",85,9000,0],

        ["S50",86,13300,0.6],

        ["S52",86.4,16000,0.6],

        ["Custom 86mm 9:1",86,23600,0.6],

        ["Custom 86.5mm 9:1",86.5,24200,0.6],

        ["Custom 87mm 9:1",87,25800,0.6],

        ["Custom 86mm 11:1",86,11700,0.6],

        ["Custom 86.5mm 11:1",86.5,11500,0.6],

        ["Custom 87mm 11:1",87,11200,0.6]

    ]



    var headgaskets = [

        ["Cutring",2.006,0.072],

        ["Cutring + Spacer",3.1,120],

        ["Oem",1.77,0.068],

        ["MLS .100",2.54,0.1],

        ["MLS .120",3.048,0.12],

        ["MLS .140",3.556,0.14]

    ]



    var fuelType = [

        ["E85",116,17],

        ["E70",108,16],

        ["Pump 93",93,14],

        ["Pump 92",92,13],

        ["Pump 91",91,12],

        ["Race 116",116,18],

        ["Race 108",108,16],

        ["Race 100",100,15]

    ]



    var data =  {

        crankshafts : {

            name    :   '',

            size    :   ''

        },

        pistons :    {

            name    :   '',

            size    :   '',

            cc      :   '',

            height  :   ''

        },

        headgasket  :  {

            name    :   '',

            thickness   :   '',

            deck    :   ''

        },

        fuel    :   {

            name    :   '',

            octane  :   '',

            other   :   ''

        }

    }



    /*Get crankshaft information*/

    $.each(crankshafts, function(){

        if (this[0] == $crankshaft){

            data.crankshafts.name = this[0];

            data.crankshafts.size = this[1];

        }

    })

    /*Get piston information*/

    $.each(pistons, function(){

        if (this[0] == $piston){

            data.pistons.name = this[0];

            data.pistons.size = this[1];

            data.pistons.cc = this[2];

            data.pistons.height = this[3];

        }

    })

    /*Get headgasket information*/

    $.each(headgaskets, function(){

        if (this[0] == $headgasket){

            data.headgasket.name = this[0];

            data.headgasket.thickness = this[1];

            data.headgasket.deck = this[2];

        }

    })

    /*Get fuel information*/

    $.each(fuelType, function(){

        if (this[0] == $fuelType){

            data.fuel.name = this[0];

            data.fuel.octane = this[1];

            data.fuel.other = this[2];

        }

    })



    /*Turn data into json string and add to input box*/

    var jsondata = JSON.stringify(data)

    $('#jsondata').val(jsondata);



    /*Equation section*/

    /*Get the uncompressed volume*/

    var uncompressed = (Math.PI*Math.pow((data.pistons.size/2), 2))*data.headgasket.thickness+data.pistons.cc+33000+((Math.PI*Math.pow((data.pistons.size/2), 2))*data.crankshafts.size);

    $('#uncompressed').html(uncompressed.toFixed(2));

    /*Get the compressed volume*/

    var compressed = (Math.PI*Math.pow((data.pistons.size/2), 2)*(data.headgasket.thickness - data.pistons.height))+33300+data.pistons.cc

    $('#compressed').html(compressed.toFixed(2));

    /*Get the final compression*/

    var compression = uncompressed/compressed;

    $('#compression').html(compression.toFixed(2));

    /*Get the displacement*/

    var displacement = 0.000006*(uncompressed - compressed);

    $('#displacement').html(displacement.toFixed(2));

    /*Get the max boost pressure*/

    var boost = (Math.pow(data.fuel.other, 2) / Math.pow(compression, 2)*14.7)-14.7

    $('#boost').html(boost.toFixed(2));

    /*Get the torque potential*/

    var torque = 240*(displacement/3.17)*(1+(boost/14.7))

    $('#torque').html(torque.toFixed(2));

})





/*Equations*/

/*



Uncompressed volume = (PI*(PistonDiam/2)^2)*Headgasket_thickness+PistonCC+HeadCC+(PI*(PI*(PistonDiam/2)^2)*Crankshaft



Compressed volume = ((PI*(PistonDiam/2)^2)*(Headgasket_thickness - Deck))+HeadCC+PistonCC



Compression = Uncompressed/Compressed volume



Max boost = ((Fuel_type_col_3)^2 / (Compression)^2)*14.7)-14.7



Torque Potential = 240*(Displacement/3.17)*(1+(Max_boost/14.7))*/

