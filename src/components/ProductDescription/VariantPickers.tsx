import { ProductDetails_product_variants } from '@sdk/queries/types/ProductDetails';
import * as React from 'react';

import { SelectField, TextField } from '..';
import { maybe } from '../../core/utils';
import { SelectValue } from '../SelectField';


interface VariantPickerProps {
		productVariants: ProductDetails_product_variants[];
    children: (variant: string, quantity: number, variantStock: number) => any;
    onSelectVariant?: React.Dispatch<React.SetStateAction<{
      variantId: string;
      quantity: number;
    }>>
}

interface ProductDescriptionState {
    primaryPicker?: { label: string; values: string[]; selected?: string };
    secondaryPicker?: { label: string; values: string[]; selected?: string };
    quantity: number;
    variants: { [x: string]: string[] };
    variant: string;
    variantStock: number;
}

class VariantPickers extends React.Component<
    VariantPickerProps,
    ProductDescriptionState
> {
	constructor(props: VariantPickerProps) {
			super(props);
			const pickers =
				maybe(() => this.props.productVariants[0].attributes[0].attribute) &&
				this.createPickers();
			this.state = {
				...pickers,
				quantity: 1,
				variant: "",
				variantStock: null,
			};
	}

	componentDidMount() {
    this.getVariant();
	}

	createPickers = () => {
    const primaryPicker = {
      label: this.props.productVariants[0].attributes[0].attribute.name,
      selected: "",
      values: [],
    };

    let secondaryPicker;

    if (this.props.productVariants[0].attributes.length > 1) {
      secondaryPicker = {
        label: this.props.productVariants[0].attributes
          .slice(1)
          .map(attribute => attribute.attribute.name)
          .join(" / "),
        selected: "",
        values: [],
      };
    }

    const variants = {};

    this.props.productVariants.map(variant => {
      if (!primaryPicker.values.includes(variant.attributes[0].value.value)) {
        primaryPicker.values.push(variant.attributes[0].value.value);
      }

      if (secondaryPicker) {
        const combinedValues = variant.attributes
          .slice(1)
          .map(attribute => attribute.value.value)
          .join(" / ");

        if (!secondaryPicker.values.includes(combinedValues)) {
          secondaryPicker.values.push(combinedValues);
        }

        if (variants[variant.attributes[0].value.value]) {
          variants[variant.attributes[0].value.value] = [
            ...variants[variant.attributes[0].value.value],
            combinedValues,
          ];
        } else {
          variants[variant.attributes[0].value.value] = [combinedValues];
        }
      }

      primaryPicker.selected = primaryPicker.values[0];
      if (secondaryPicker) {
        secondaryPicker.selected = secondaryPicker.values[0];
      }
    });

    return {
      primaryPicker,
      secondaryPicker,
      variants,
    };
	};
	
	onPrimaryPickerChange = value => {
    const primaryPicker = this.state.primaryPicker;
    primaryPicker.selected = value;
    this.setState({ primaryPicker });
    if (this.state.secondaryPicker) {
      if (
        !this.state.variants[value].includes(
          this.state.secondaryPicker.selected
        )
      ) {
        this.onSecondaryPickerChange("");
        this.setState({ variant: "" });
      } else {
        this.getVariant();
      }
    } else {
      this.getVariant();
    }
  };

  onSecondaryPickerChange = value => {
    const secondaryPicker = this.state.secondaryPicker;
    secondaryPicker.selected = value;
    this.setState({ secondaryPicker });
    this.getVariant();
  };

  getVariant = () => {
    const { productVariants } = this.props;
    const { primaryPicker, secondaryPicker, quantity } = this.state;
    let variant;

    if (!secondaryPicker && primaryPicker) {
      variant = productVariants.find(
        variant => variant.name === `${primaryPicker.selected}`
      );
    } else if (secondaryPicker && primaryPicker) {
      variant = productVariants.find(
        variant =>
          variant.name ===
          `${primaryPicker.selected} / ${secondaryPicker.selected}`
      );
    } else {
      variant = this.props.productVariants[0];
    }

    const variantStock = variant.stockQuantity;
    this.setState({ variant: variant.id, variantStock });
    if (this.props.onSelectVariant) {
      this.props.onSelectVariant({
        variantId: variant.id,
        quantity,
      });
    }
  };


	render() {
		
		const {
      primaryPicker,
      quantity,
			secondaryPicker, 
			variants,
			variant,
			variantStock,
		} = this.state;
		return (
			<div className="product-description__variant-picker">
			{primaryPicker && (
				<SelectField
					onChange={(e: SelectValue) => this.onPrimaryPickerChange(e.value)}
					label={primaryPicker.label}
					key={primaryPicker.label}
					value={{
						label: primaryPicker.selected,
						value: primaryPicker.selected,
					}}
					styleType="grey"
					options={primaryPicker.values.map(value => ({
						label: value,
						value,
					}))}
				/>
			)}
			{secondaryPicker && (
				<SelectField
					onChange={(e: SelectValue) =>
						this.onSecondaryPickerChange(e.value)
					}
					label={secondaryPicker.label}
					key={secondaryPicker.label}
					value={
						secondaryPicker.selected && {
							label: secondaryPicker.selected,
							value: secondaryPicker.selected,
						}
					}
					styleType="grey"
					options={secondaryPicker.values.map(value => ({
						isDisabled: !variants[primaryPicker.selected].includes(value),
						label: value,
						value,
					}))}
				/>
			)}
			<TextField
				type="number"
				label="Quantity"
				min="1"
				value={quantity || ""}
				styleType="grey"
				onChange={e => {
          const quantity = Math.max(1, Number(e.target.value))
          this.setState({ quantity  })
          if (this.props.onSelectVariant) {
            this.props.onSelectVariant({
              variantId: variant,
              quantity,
            });
          }
          }
				}
			/>
			{this.props.children(variant, quantity, variantStock)}
		</div>
		)
	}
	



}

export default VariantPickers;