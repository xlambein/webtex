marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

var WebTex = {
  escape: function (html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
     .replace(/'/g, '&#39;');
  },
  
  markdown: function (target) {
    var html = marked(target.innerHTML);
    target.innerHTML = html;
  },
  
  render: function (sourceCode, target, callback) {
    target.innerHTML = this.escape(sourceCode);
    
    MathJax.Hub.Queue(
      ["Typeset", MathJax.Hub, target],
      ["markdown", this, target],
      [callback]
    );
  },
};