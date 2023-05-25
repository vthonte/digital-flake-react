import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logo from 'assets/img/illustrations/digitalflake.png';

const Logo = ({ at, width, className, textClass, ...rest }) => {
  return (
    <Link
      to="/"
      className={classNames(
        'text-decoration-none',
        { 'navbar-brand text-left': at === 'navbar-vertical' },
        { 'navbar-brand text-left': at === 'navbar-top' }
      )}
      {...rest}
    >
      <div
        className={classNames(
          {
            'd-flex align-items-center py-3': at === 'navbar-vertical',
            'd-flex align-items-center': at === 'navbar-top',
            'd-flex flex-center fw-bolder fs-5 mb-4': at === 'auth',
            'd-block fw-bolder fs-5 mb-4': at === 'center',
          },
          className
        )}
      >
        {/* <img className="me-2" src={logo} alt="Logo" width={width} /> */}

        <svg className={classNames({
          "mx-auto d-block text-center": at === 'center'
        })} width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.9968 45.362H5.77227C2.5897 45.362 0 42.7722 0 39.5897V6.36582C0 3.18254 2.5897 0.592834 5.77227 0.592834H38.9968C42.1794 0.592834 44.7691 3.18254 44.7691 6.36582V39.589C44.7691 42.7722 42.1794 45.362 38.9968 45.362ZM5.77227 2.14017C3.44261 2.14017 1.54734 4.03545 1.54734 6.36582V39.589C1.54734 41.9193 3.44261 43.8146 5.77227 43.8146H38.9968C41.3265 43.8146 43.2218 41.9193 43.2218 39.589V6.36582C43.2218 4.03545 41.3265 2.14017 38.9968 2.14017H5.77227Z" fill="white" />
          <path d="M33.7375 14.7494C32.3731 12.3665 30.4397 10.5382 27.9371 9.26386C27.023 8.7985 26.0527 8.41887 25.0283 8.12352V12.7202C26.0073 13.1992 26.8645 13.823 27.6 14.5917C29.5486 16.6303 30.5225 19.4628 30.5225 23.0898C30.5225 26.6866 29.5486 29.4744 27.6 31.4525C26.8645 32.1988 26.0073 32.8046 25.0283 33.2692V37.8493C26.0527 37.5612 27.0223 37.1902 27.9371 36.7356C30.4397 35.4923 32.3731 33.7007 33.7375 31.3624C35.1012 29.0241 35.7833 26.2666 35.7833 23.0891C35.7833 19.9137 35.1012 17.1331 33.7375 14.7494ZM10.2414 7.35345C9.54844 7.35345 8.98584 7.91318 8.98584 8.60328V38.6021H19.1919C19.3778 38.6021 19.5615 38.5992 19.7445 38.5956V34.411C19.5622 34.4161 19.3785 34.4204 19.1919 34.4204H14.1112V11.5344H19.1919C19.3785 11.5344 19.5622 11.5388 19.7445 11.5445V7.35994C19.5615 7.35562 19.3778 7.35345 19.1919 7.35345H10.2414Z" fill="white" />
        </svg>


        {
          (at === 'center') ?
            (
              <div className='text-center'>
                <span className={classNames('font-sans-serif', textClass)}>digitalflake</span>
              </div>
            ) : (
              <span className={classNames('font-sans-serif', textClass)}>digitalflake</span>
            )
        }



      </div>
    </Link>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  width: PropTypes.number,
  className: PropTypes.string,
  textClass: PropTypes.string
};

Logo.defaultProps = { at: 'auth', width: 58 };

export default Logo;
