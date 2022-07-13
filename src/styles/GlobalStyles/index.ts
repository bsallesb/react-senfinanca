import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html, body, #root {
        min-height: 100vh;
    }

    body {
        background-color: #edf3fb;
    }

    a {
        color: inherit;
    }

    // Bootstrap overrides
    .fs-7 { font-size: 0.75rem; }

    .card {
        border: solid 1px #efefef;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.025);
        border-radius: 1rem;

        & > .card-body {
            padding: 2rem;

            @media (max-width: 767px) {
                padding: 1rem;
            }
        }
    }

    .modal-content {
        border-radius: 1rem;

        & > .modal-body {
            padding: 2rem;
        }
    }

    .btn {
        border-radius: 2rem;
        padding: .375rem 1.5rem;
    }

    .form-control, .form-select {
        border-radius: 2rem;
    }
`;
