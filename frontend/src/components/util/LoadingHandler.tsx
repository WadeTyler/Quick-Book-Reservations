import React from 'react';
import {LoadingSpinnerXL} from "@/components/LoadingSpinners";
import Link from "next/link";

function LoadingHandler<T>({children, isLoading, object, error, errorBackLink, errorBackLinkText}: {
  children: React.ReactNode;
  isLoading: boolean;
  object: T | null;
  error: Error | null;
  errorBackLink?: string;
  errorBackLinkText?: string;
}) {
  return (
    <>
      {isLoading && (
        <LoadingSpinnerXL/>
      )}

      {!isLoading && error && (
        <div className="flex flex-col gap-4 items-center">
          <h1>Something went wrong</h1>
          <p className="error-msg">{(error as Error).message || "Something went wrong."}</p>
          {errorBackLink && (
            <Link
              href={errorBackLink}
              className="link-1"
            >
              {errorBackLinkText ? errorBackLinkText : "Go Back"}
            </Link>
          )}
        </div>
      )}

      {!isLoading && !error && object && (
        <>
          {children}
        </>
      )}
    </>
  );
}

export default LoadingHandler;