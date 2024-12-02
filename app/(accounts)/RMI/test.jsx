"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  account: z
    .string()
    .min(2, { message: "account name must be at least 2 lettes." }),

  receivedFrom: z.string().min(1, { message: "Received From is required." }),

  receiptNo: z
    .number()
    .nonnegative()
    .int()
    .min(1, { message: "Receipt No must be a positive number." })
    .optional(),

  cashBank: z.enum(["cash", "bank"]),

  totalAmount: z
    .number()
    .positive()
    .min(0, { message: "Total Amount must be a positive number." }),

  rmiFund: z
    .number()
    .positive()
    .min(0, { message: "RMI Fund must be a positive number." }),

  otherVotheads: z
    .number()
    .positive()
    .min(0, { message: "Other Votheads must be a positive number." }),

  date: z.date({ required_error: "Date is required." }),
});

const AddReceipts = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      receivedFrom: "",
      receiptNo: "",
      cashBank: "cash",
      totalAmount: "",
      rmiFund: "",
      otherVotheads: "",
      date: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Account name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="receivedFrom"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>From whom received</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="e.g FSE..."></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FSE">FSE(Government Funds)</SelectItem>
                      <SelectItem value="other">other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="receiptNo"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Receipt No.</FormLabel>
                  <FormControl>
                    <Input
                      disabled="true"
                      type="number"
                      placeholder="Enter receipt number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="cashBank"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cash or Bank?</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Cash or Bank..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Total amount received..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="rmiFund"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>RMI funds</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Funds for RMI..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="otherVoteHeads"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>other voteheads funds</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Funds for other voteheads..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default AddReceipts;
