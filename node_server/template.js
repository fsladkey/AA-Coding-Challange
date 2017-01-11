module.exports = function (binding) {
  return (
    `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <h1>Hello world!</h1>
        <p>${binding.content}</p>
      </body>
    </html>

    `
  )
}
