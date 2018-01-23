import Link from 'next/link'

const url = "/_access_watch/dashboard/#/metrics?timeSlider=auto";

export default () => (
  <div>
    <div className="accessWatch">
      <div className="previewContainer">
        <div className="dashboardPreview">
          <iframe src={url} frameborder="0">
          </iframe>
        </div>
        <a className="dashboardLink" target="_blank" href={url}>
        </a>
      </div>
      <p>
        This is a demo of the <a href="https://access.watch">Access Watch</a> open source web traffic manager. We <a href="https://github.com/access-watch/next-news">cloned</a> the <a href="https://next-news.now.sh/">Next News</a> example project, bundled the <a href="https://github.com/access-watch/access-watch">Access Watch agent</a> in it and deployed on <a href="https://zeit.co/now">Now</a>. Have a look at <a href="/_access_watch/dashboard/#/metrics">the bundled dashboard</a> to watch and control the traffic on this website in real time. Interested? Want to try at home? Check <a href="https://access.watch/">our website</a> for details and installation instructions for Express, Nginx, Apache and more.
      </p>
    </div>
    <style jsx>{`
      .accessWatch {
        color: white;
        background: rgb(70, 57, 106);
        min-height: 205px;
        padding: 10px;
      }
      .accessWatch .previewContainer {
        position:relative;
        float: left;
        margin: 10px;
        margin-right: 25px;
      }
      .accessWatch .dashboardPreview, .accessWatch .dashboardLink {
        display: block;
        width: 288px;
        height: 160px;
        border:1px solid #ccc;
      }
      .accessWatch .dashboardPreview {
        transform-origin: 0 0;
        transform: scale(0.20);
      }
      .accessWatch .dashboardPreview iframe {
        width: 1440px;
        height: 800px;
      }
      .accessWatch .dashboardLink {
        position: absolute;
        top: 0;
      }
      .accessWatch p {
        padding: 5px 10px;
        font-size: 16px;
        line-height: 28px;
      }
      .accessWatch, a {
        color: white;
      }
    `}</style>
  </div>
)
