
(function() {
  const host = 'https://httpbin.org';
  const getPath = 'html'

  function addAFucker(newchild) {
    const rs = document.querySelector('section#results');
    rs.appendChild(newchild);
    return newchild;
  }

  // Fetch GET
  fetch(`${host}/${getPath}`)
  .then( r => {
    if (r.ok) return r;
    throw new Errorl('Invalid Status Code');
  })
  // .then( r => r.text() )
  .then( r => {
    const resultHTML = document.createElement('h4');
    let resultInner = `response-type: ${r.type}<br>`;
    for (let pair of r.headers.entries()) {
      resultInner += `${pair[0]}: ${pair[1]}<br/>`;
    }
    resultHTML.innerHTML = resultInner;
    return resultHTML;
  })
  .then( r => {
    return addAFucker(r);
  })
  .catch(console.error);

  // Fetch POST
  // FormData takes an optional selector argument that
  //  will scrub a <form> element and automagically
  //  create the post body
  var postData = new FormData();
  postData.append('foo', 'bar');
  postData.append('baz', 'boom');

  var postProm = fetch(`${host}/post`, {
    method: 'POST',
    body: JSON.stringify({foo: 'bar', baz: 'boom'}),
  });
  postProm
    .then( r => {
      if (r.ok) return r;
      throw new Error('POST ERROR')
    })
    .then( r => r.clone() )
    .then( r => r.json() )
    .then( r => console.log(r) || r)
    .catch(console.error);

  postProm
    .then( r => {
      if (r.ok) return r;
      throw new Error('POST ERROR')
    })
    .then( r => r.clone() )
    .then( r => r.blob() )
    .then( r => console.log(r) || r)
    .catch(console.error);
})()
