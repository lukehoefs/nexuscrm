export interface RFQItem {
  id: number;
  partName: string;
  sku: string;
  quantity: number;
  material: string;
  process: string;
}

export interface RateCard {
  getRate: (material: string, process: string) => number;
}

export class PricingEngine {
  calculateVolumeTier(quantity: number): number {
    if (quantity >= 5000) return 0.8;
    if (quantity >= 1000) return 0.9;
    return 1.0;
  }

  async calculateQuote(lineItems: RFQItem[], rateCard: RateCard) {
    return lineItems.map(item => {
      const basePrice = rateCard.getRate(item.material, item.process);
      const volumeDiscount = this.calculateVolumeTier(item.quantity);
      
      const internalCost = (basePrice * 0.6) * item.quantity;
      const quotedPrice = (basePrice * volumeDiscount) * item.quantity;

      return {
        ...item,
        quotedPrice,
        internalCost,
        margin: (quotedPrice - internalCost) / quotedPrice
      };
    });
  }
}
