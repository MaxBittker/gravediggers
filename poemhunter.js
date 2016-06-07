'use strict'
var fs = require('fs')
let cheerio = require('cheerio')
let request = require('request')

const baseUrl = 'http://members.poemhunter.com/members/random-poem/'
const resetUrl = 'http://members.poemhunter.com/members/random-poem/find_random_poem.asp'
let c = 1000
let poems = ''

function scrapePoem(){
      request.post(resetUrl, {form:{key:'value'}})

      request(baseUrl, function (err, res, bod) {
          if (err) {
              throw err
          }

          let $ = cheerio.load(bod);


          let content = $('.content-block.random-poem .poem p').map(function (i, el) {
              return ($(this).text()+ '\n')
          }).get().toString()
          poems+= content
          c--;
          console.log(c + "  " + content.slice(0,15))

          if(c <= 0 ){
            fs.writeFile("output.txt",""+ JSON.stringify(poems), (error) => {
                         if (err) throw err
                     })
           }
          else
          scrapePoem()

      })
}

scrapePoem()
