const express = require('express');
const router = express.Router();
const {chicosUpdate, chicosStats} = require('./mongodb/mongo_connect');


router.use((req, res, next) => {
    console.log(`Api data  ${Date.now()}`);
    next();
})
router.get('/perfil', (req, res) => {
    chicosUpdate.find({}, (err, data) => {
        res.json(data);
    })
})
router.get( /(perfil)\/\w*/, async (req, res) => {
    const name = req.url.toLowerCase().split('/perfil/')[1];
    /*
    chicosStats.find({}, (err, data) =>{ 
        res.json(data);
    })
    */
   const data = await messagePerfil(name);
   console.log('Dato de ' + name + ' enviado');
   res.json(data);
    
})

module.exports = {
    router,
}


const messagePerfil = async (name) => {
    const cond_amigo = {
        $cond : {
            if : {$isArray :'$friends'},
            then: {
                $map :{
                    input : "$friends",
                    as : "amigos",
                    in : "$$amigos.name"
                }
            },
            else: []
        }
    }
    const cond_winrate = {
        $cond : {
            if : {$isArray :'$friends'},
            then: {
                $map :{
                    input : "$friends",
                    as : "amigos",
                    in : {$round : [{$multiply : [{$divide : ["$$amigos.wins", "$$amigos.total_matches"]}, 100]}, 2]}
                }
            },
            else: []
        }
    }
    const match = {name : name}
    const project = {
        amigo_name      : cond_amigo,
        amigo_winrate   : cond_winrate,
        name            : 1,
        kills           : 1,
        deaths          : 1,
        assists         : 1,
        total_matches   : 1,
        avgWins         : {$round : [{$multiply : [{$divide : ["$wins", "$total_matches"]}, 100]}, 2]},
    }
    const stats = await chicosStats.aggregate([{$match : match}, {$project : project}])
    //const stats = await chicosStats.findOne({"name" : name});
    /*
    const stats_perfil = await chicosUpdate.findOne({account_id : chicos_id.get(name)});
    
    if(stats === null && stats_perfil === null) throw new Error("Error en la llamada al db") //si algun call del db tirar error stop
    const message_embed = lookPerfil.execute(stats_perfil, stats[0]);
    message.channel.send({embed: message_embed})
    */
   return stats;
};

const messageHero = async (name, hero, message) => {
    //Estas dos variables filtran los datos que seran entregados del db
    const match = {name : name}
    const project1 = {"name" : 1 , "heroes" : { $filter : {input :"$heroes", as :"hero", cond : {$eq : ["$$hero.name" , hero]}}}}
    const cond_amigo = {
        $cond : {
            if : {$isArray :'$heroes.friends'},
            then: {
                $map :{
                    input : "$heroes.friends",
                    as : "friends",
                    in : "$$friends.name"
                }
            },
            else: []
        }
    }
    const cond_winrate = {
        $cond : {
            if : {$isArray :'$heroes.friends'},
            then: {
                $map :{
                    input : "$heroes.friends",
                    as : "friends",
                    in : {$round : [{$multiply : [{$divide : ["$$friends.wins", "$$friends.total_matches"]}, 100]}, 2]}
                }
            },
            else: []
        }
    }
    //Aca designamos las variables que se veran adentro del objecto
    const project2 = {
        name : 1,
        hero_name : "$heroes.name_localized",
        avg_kills  : {$round : [{$avg : "$heroes.kills"},2 ]}, 
        avg_deaths : {$round : [{$avg : "$heroes.deaths"},2]},
        avg_assists: {$round : [{$avg : "$heroes.assists"}, 2]},
        avgWins   : {$round : [{$multiply : [{$divide : ["$heroes.wins", "$heroes.total_matches"]}, 100]}, 2]},
        amigo_winrate : cond_winrate,
        amigo_name : cond_amigo
        }
    const stats = await chicosStats.aggregate([{$match : match}, {$project: project1}, {$unwind : "$heroes"}, {$project: project2}]);
    const stats_perfil = await chicosUpdate.findOne({account_id : chicos_id.get(name)});
    if(stats == undefined || stats_perfil == undefined) throw new Error("Error en la llamada al db") //si algun call del db tirar error stop
    const message_embed = lookHeroes.execute(stats[0], stats_perfil);
    message.channel.send({embed: message_embed});
}