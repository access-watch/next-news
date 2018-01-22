import Link from 'next/link'

export default () => (
  <div>
    <div className="accessWatch">
      <a href="/_access_watch/dashboard/#/metrics">
        <img width="300" src="https://access.watch/reveal/static/media/snap_metrics.9889112a.png"/>
      </a>
      <p>
        This is a demo of the Access Watch open source web traffic manager. We <a href="https://github.com/access-watch/next-news">cloned</a> the <a href="https://next-news.now.sh/">Next News</a> example project, bundled the <a href="https://github.com/access-watch/access-watch">Access Watch agent</a> in it and deployed on <a href="https://zeit.co/now">Now</a>. Have a look at <a href="/_access_watch/dashboard/#/metrics">the bundled dashboard</a> to watch and control the traffic on this website in real time. Interested? Want to try at home? Check <a target="_blank" href="https://access.watch/">our website</a> for details and installation instructions for Express, Nginx, Apache and more.</p>
    </div>
    <style jsx>{`
      .accessWatch {
        color: white;
        background: rgb(70, 57, 106);
        min-height: 205px;
        padding: 10px;
      }
      .accessWatch p {
        padding: 5px 10px;
        font-size: 16px;
        line-height: 28px;
      }
      .accessWatch img {
        display: block;
        float: right;
        margin: 10px 10px;
        border:1px solid #ccc;
      }
      .accessWatch, a {
        color: white;
      }
    `}</style>
  </div>
)
