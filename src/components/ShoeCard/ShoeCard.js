import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const VARIANT_LABELS = {
  'on-sale': 'Sale',
  'new-release': 'Just released!'
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantLabel = VARIANT_LABELS[variant]

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice &&
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          }
        </Row>
        {variantLabel &&
          <VariantLabel
            style={{
              '--background': variant === 'on-sale' ? COLORS.primary : COLORS.secondary
            }}
          >
            {variantLabel}
          </VariantLabel>
        }
      </Wrapper>
    </Link>
  );
};

const VariantLabel = styled.span`
  background-color: var(--background);
  padding: 8px;
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 2px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 340px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${p => p.onSale ? 'line-through' : 'none'};
  color: ${p => p.onSale ? COLORS.gray[700] : 'currentColor'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
