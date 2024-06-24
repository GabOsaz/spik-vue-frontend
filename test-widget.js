function widget() {
  function createIframe() {
    var iframe = document.createElement('iframe')

    // Set attributes for the iframe
    iframe.src = 'https://kappapay.com' // URL of the content to display
    iframe.style.position = 'fixed'
    iframe.style.bottom = '10'
    iframe.style.right = '10'
    iframe.style.width = '600px'
    iframe.style.height = '400px'
    iframe.style.border = '1px solid #ccc' // Optional: Add a border style

    // Set additional attributes if needed
    iframe.allow = 'fullscreen'
    iframe.frameBorder = '0'

    // Append the iframe to the body or any other container
    document.body.appendChild(iframe)
  }

  createIframe()
}

widget()
