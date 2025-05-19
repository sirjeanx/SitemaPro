import styled from "styled-components";

export function CardDatosEmpresa({title,value,img}) {
    return (
        <Container>
        <div className="card">
            <div className="pricing-block-content">
                <p className="pricing-plan">
                {title} 
                </p>
                <div className="price-value">
                <p className="price-number">
                {value}
                </p>
                {
                    img && <img src={img} alt="icono" />
                }

                </div>
            </div>
        </div>
        </Container>
    );
    }
const Container = styled.div`
.card{
z-index:1;
    width: 190px;
    background: #fffefe;
    padding: 1rem;
    border-radius: 1rem;
    border: 0.5vmin solid #000000;
    box-shadow: 0.4rem 0.4rem 0.4rem #000000;
    overflow: hidden;
    color: #000000;
    .pricing-block-content{
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 0.5rem;
    .pricing-plan{
    color: #000000;
    font-size: 1.2rem;
    line-height: 1.5rem;
    font-weight: 600;
    }
    .price-value{
    display: flex;
    color: #000000;
    font-size: 1.5rem;
    gap: 0.5rem;
    font-weight: 600;
    justify-content: center;
    img{
    width: 50px;
    }
    }
    }

    
    }
`;