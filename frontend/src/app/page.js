"use client";

import {
  useState,
} from "react";

import {
  useQuery,
} from
"@tanstack/react-query";

import {
  getBlogs,
} from "@/services/blog.service";

import BlogCard
from "@/components/BlogCard";

import BlogCardSkeleton
from "@/skeletons/BlogCardSkeleton";

import EmptyState
from "@/components/ui/EmptyState";

import ErrorState
from "@/components/ui/ErrorState";

import SearchBar
from "@/components/SearchBar";

import CategoryFilter
from "@/components/CategoryFilter";

import HeroSection
from "@/components/HeroSection";

export default function
BlogsPage() {

  // SEARCH

  const [

    search,

    setSearch,

  ] = useState("");

  // CATEGORY

  const [

    category,

    setCategory,

  ] = useState("All");

  // PAGINATION

  const [

    currentPage,

    setCurrentPage,

  ] = useState(1);

  const blogsPerPage = 6;

  // FETCH BLOGS

  const {

    data,

    isLoading,

    error,

  } = useQuery({

    queryKey: [
      "blogs",
    ],

    queryFn:
      getBlogs,

  });

  // LOADING

  if (isLoading) {

    return (

      <div
        className="
        max-w-7xl
        mx-auto
        p-6
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
      >

        {Array.from({
          length: 6,
        }).map((_, index) => (

          <BlogCardSkeleton
            key={index}
          />

        ))}

      </div>

    );

  }

  // ERROR

  if (error) {

    return (

      <ErrorState
        message="
        Failed to load blogs
        "
      />

    );

  }

  // BLOGS

  const blogs =
    data?.blogs || [];

  // FILTERED BLOGS

  const filteredBlogs =
    blogs.filter((blog) => {

      // SEARCH

      const matchesSearch =

        blog.title
          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          );

      // CATEGORY

      const matchesCategory =

        category === "All"

          ? true

          : blog.category ===
            category;

      return (

        matchesSearch &&
        matchesCategory

      );

    });

  // PAGINATION LOGIC

  const totalPages =
    Math.ceil(

      filteredBlogs.length /
      blogsPerPage

    );

  const startIndex =
    (currentPage - 1) *
    blogsPerPage;

  const paginatedBlogs =
    filteredBlogs.slice(

      startIndex,

      startIndex +
      blogsPerPage

    );

  return (

    <>

      {/* HERO */}

      <HeroSection />

      {/* MAIN */}

      <div
        className="
        max-w-7xl
        mx-auto
        p-6
      "
      >

        {/* HEADER */}

        <div
          className="
          flex
          flex-col
          gap-6
          mb-10
        "
        >

          <h1
            className="
            text-4xl
            font-bold
          "
          >

            Latest Blogs

          </h1>

          {/* SEARCH */}

          <SearchBar

            search={search}

            setSearch={setSearch}

          />

          {/* FILTER */}

          <CategoryFilter

            category={category}

            setCategory={setCategory}

          />

        </div>

        {/* EMPTY */}

        {filteredBlogs.length === 0 ? (

          <EmptyState

            title="
            No Blogs Found
            "

            description="
            Try changing search or filters.
            "

            buttonText="
            Create Blog
            "

            buttonLink="
            /create-blog
            "

          />

        ) : (

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
          >

            {paginatedBlogs.map(
              (blog) => (

                <BlogCard

                  key={blog._id}

                  blog={blog}

                />

              )
            )}

          </div>

        )}

        {/* PAGINATION */}

        {totalPages > 1 && (

          <div
            className="
            mt-14
            flex
            items-center
            justify-center
            gap-3
            flex-wrap
          "
          >

            {/* PREV */}

            <button

              disabled={
                currentPage === 1
              }

              onClick={() =>

                setCurrentPage(
                  (prev) =>
                    prev - 1
                )

              }

              className="
              px-4
              py-2
              rounded-xl
              border
              disabled:opacity-50
            "
            >

              Prev

            </button>

            {/* PAGE NUMBERS */}

            {Array.from({

              length: totalPages,

            }).map((_, index) => {

              const page =
                index + 1;

              return (

                <button

                  key={page}

                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }

                  className={`
                    w-10
                    h-10
                    rounded-xl
                    border

                    ${
                      currentPage ===
                      page

                        ? "bg-black text-white"

                        : "bg-white"
                    }
                  `}
                >

                  {page}

                </button>

              );

            })}

            {/* NEXT */}

            <button

              disabled={
                currentPage ===
                totalPages
              }

              onClick={() =>

                setCurrentPage(
                  (prev) =>
                    prev + 1
                )

              }

              className="
              px-4
              py-2
              rounded-xl
              border
              disabled:opacity-50
            "
            >

              Next

            </button>

          </div>

        )}

      </div>

    </>

  );

}