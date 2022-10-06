import React, { Component } from 'react';

class Footer extends Component {
  render() {

    if(this.props.data){
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
    }

    return (
      <footer>

     <div className="row">
        <div className="twelve columns">
           <ul className="social-links">
              {networks}
           </ul>

           <ul className="copyright">
              <li><a href="/imprint.html">Impressum</a></li>
              <li>&copy; Copyright {new Date().getFullYear()} Stefan Michel</li>
           </ul>

        </div>
        <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
     </div>
          <a href="https://www.hitwebcounter.com" target="_blank">
              <img src="https://hitwebcounter.com/counter/counter.php?page=8047551&style=0024&nbdigits=5&type=page&initCount=0" title="Free Counter" Alt="web counter"   border="0" />
          </a>
      </footer>
    );
  }
}

export default Footer;
