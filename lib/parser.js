const { info, warn } = require('./logger')

let camoUrl = null
let regex = null

const setCamoUrl = data => {
  regex = data.regex
  camoUrl = require('camo-url')(data)
}

const parseRaw = (content, callback) => {
  if (!camoUrl || !regex) return content
  content = content.replace(regex, (match, url) => match.replace(url, camoUrl(url)))
  callback(null, content)
}

const parsePost = (data, callback) => {
  parseRaw(data.postData.content, (err, content) => {
    data.postData.content = content
    callback(null, data)
  })
}

const parseSignature = (data, callback) => {
  parseRaw(data.userData.signature, (err, content) => {
    data.userData.signature = content
    callback(null, data)
  })
}

const parseAboutMe = (data, callback) => {
  parseRaw(data, (err, content) => {
    callback(null, content)
  })
}

exports.setCamoUrl     = setCamoUrl
exports.parseRaw       = parseRaw
exports.parsePost      = parsePost
exports.parseSignature = parseSignature
exports.parseAboutMe   = parseAboutMe

