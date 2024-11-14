"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

// criamos um componente para o botão que leva ao checkout pois na pagina de checkout por ser um server component
// não podemos chamar o onClick do botão

export const AcquirePlanButoon = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found!");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      {},
    );
    if (!stripe) {
      throw new Error("Stripe not found");
    }
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full font-bold"
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButoon;

// aqui no lado do cliente depois de criar o checkout no servidor, primeiro chamamos nossa função criada
// carregamos o Stripe
// e por fim redirecionamos o usuário